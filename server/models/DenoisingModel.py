from modal import  CloudBucketMount, Secret, enter, gpu, method
from fastapi import UploadFile

from setup import stub, image
from config.model import *
from config.container import *
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
class DenoisingModel:
    @enter()
    def load_model(self):
        import time
        import tensorflow as tf

        print("[MODEL] Loading denoiser model...")
        start = time.time()
        self.model = tf.keras.models.load_model(DENOISING_MODEL_PATH)
        print(f"[MODEL] Loaded model in {time.time()-start} seconds")

    @method()
    def inference(self, file: UploadFile) -> bytes:
        from PIL import Image

        image = Image.open(file.file)

        # Resize
        image = image.resize(MODEL_INPUT_SHAPE)
        
        img_array = np.array(image)

        # Add batch dimension
        img_batch = np.expand_dims(img_array, 0)
        
        # Rescale
        print(f"[MODEL] Min Max before rescaling: {np.min(img_batch)}, {np.max(img_batch)}")
        img_batch = img_batch.astype(np.float32) / INPUT_IMAGE_RESCALE
        print(f"[MODEL] Min Max after rescaling: {np.min(img_batch)}, {np.max(img_batch)}")

        print(f"[MODEL] Image array batch: {img_batch.shape}")

        prediction_batch = self.model.predict(img_batch)        
        print(f"[MODEL] Prediction batch: {prediction_batch.shape}")

        prediction = prediction_batch[0]
        print(f"[MODEL] Prediction: {prediction.shape}")

        print(f"[MODEL] Min Max before rescaling: {np.min(prediction)}, {np.max(prediction)}")

        # Postprocess
        prediction = rescale_and_correct_denoising_prediction(prediction, correction_amount=0.2)
        
        print(f"[MODEL] Min Max after rescaling: {np.min(prediction)}, {np.max(prediction)}")

        # Convert to PIL Image
        prediction = Image.fromarray(prediction)

        # Save overlay image to bytearray
        bytearray = pil_image_to_bytearray(prediction)

        return bytearray