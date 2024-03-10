from modal import  CloudBucketMount, Secret, enter, gpu, method
from fastapi import UploadFile

from setup import stub, image
from config.model import *
from config.container import *
from models.custom_objects import dice_coef, dice_loss, iou_coef
from processing.postprocessing import *


@stub.cls(
    image=image, 
    gpu=gpu.A10G(), 
    container_idle_timeout=CONTAINER_IDLE_TIMEOUT,
    volumes={
        MOUNT_PATH: CloudBucketMount(
            MODEL_BUCKET,
            secret=Secret.from_name(AWS_SECRET_NAME),
        )
    },
)
class TumorSegmentationModel:
    @enter()
    def load_model(self):
        import time
        import tensorflow as tf

        print("[MODEL] Loading segmentation model...")
        start = time.time()
        self.model = tf.keras.models.load_model(SEGMENTATION_MODEL_PATH, {
            "iou_coef": iou_coef,
            "dice_loss": dice_loss,
            "dice_coef": dice_coef,
        })
        print(f"[MODEL] Loaded model in {time.time()-start} seconds")

    @method()
    def inference(self, file: UploadFile) -> bytes:
        import numpy as np
        from PIL import Image
        
        image = Image.open(file.file)

        # Resize
        image = image.resize(MODEL_INPUT_SHAPE)
        
        img_array = np.array(image)

        # Add batch dimension
        img_batch = np.expand_dims(img_array, 0)
        
        # Rescale
        img_batch = img_batch.astype(np.float64) / INPUT_IMAGE_RESCALE
        print(f"[MODEL] Image array batch: {img_batch.shape}")

        prediction_batch = self.model.predict(img_batch)        
        print(f"[MODEL] Prediction batch: {prediction_batch.shape}")

        prediction = prediction_batch[0]
        print(f"[MODEL] Prediction: {prediction.shape}")

        # Overlay prediction onto original image
        binary_mask = threshold_prediction(prediction)
        print(f"[MODEL] Binary Mask: {binary_mask.shape}")

        binary_mask = np.tile(binary_mask, 3) # 3 for RGB channels
        print(f"[MODEL] Binary Mask: {binary_mask.shape}")

        # Get green mask
        green_mask = get_green_mask(binary_mask)
        print(f"[MODEL] Green Mask: {green_mask.shape}")

        # Get overlay
        overlay = get_overlay(binary_mask, green_mask, img_array)
        print(f"[MODEL] Overlay: {overlay.shape}")

        # Convert overlay to PIL Image
        overlay = Image.fromarray(np.uint8(overlay))

        # Save overlay image to bytes
        overlay_bytearray = pil_image_to_bytearray(overlay)

        # Convert mask to PIL Image
        green_mask = Image.fromarray(np.uint8(green_mask))

        # Save mask to bytes
        green_mask_bytearray = pil_image_to_bytearray(green_mask)

        return overlay_bytearray, green_mask_bytearray