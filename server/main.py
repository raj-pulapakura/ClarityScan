from modal import web_endpoint, CloudBucketMount, Secret,  Image, Stub, build, enter, gpu, method
from tensorflow_functions import dice_coef, dice_loss, iou_coef
from fastapi import UploadFile, Response
from stub import stub, image
import os

MOUNT_PATH = "/bucket"
MODEL_BUCKET = "brain-tumor-segmentation-model"
MODEL_PATH = os.path.join(MOUNT_PATH, "models", "tumor_segmentation.keras")
AWS_SECRET_NAME = "my-aws-secret"
CONTAINER_IDLE_TIMEOUT = 240

INPUT_IMAGE_RESCALE = 255.0
MODEL_INPUT_SHAPE = (256, 256)
PREDICTION_THRESHOLD = 0.5

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
class Model:
    @enter()
    def load_model(self):
        import os
        import time
        import tensorflow as tf

        print("Loading model...")
        start = time.time()
        self.model = tf.keras.models.load_model(MODEL_PATH, {
            "iou_coef": iou_coef,
            "dice_loss": dice_loss,
            "dice_coef": dice_coef,
        })
        self.model.summary()
        print(f"Loaded model in {time.time()-start} seconds")

    @method()
    def inference(self, batch):
        print("Inferring model")
        return self.model.predict(batch)


@stub.function(
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
@web_endpoint(method="POST")
def run_model(file: UploadFile):
    try:
        import tensorflow as tf
        from PIL import Image
        import numpy as np
        import io

        print(f"Tensorflow version: {tf.__version__}")

        # Read the input file

        image = Image.open(file.file)

        # Process the input file

        image = image.resize(MODEL_INPUT_SHAPE)

        imarray = np.array(image)
        imarray_batch = np.expand_dims(imarray, 0)
        imarray_batch = imarray_batch.astype(np.float64) / INPUT_IMAGE_RESCALE
        print(f"Image array batch: {imarray_batch.shape}")

        # Run inference

        prediction_batch = Model().inference.remote(imarray_batch)        
        print(f"Prediction batch: {prediction_batch.shape}")

        # Overlay prediction onto original image

        prediction = prediction_batch[0]
        prediction[prediction < PREDICTION_THRESHOLD] = 0
        prediction[prediction >= PREDICTION_THRESHOLD] = 255

        overlay = np.tile(prediction, 3) # 3 for RGB channels

        green_overlay = overlay.copy()
        green_overlay[:, :, 0] = np.zeros((256, 256)) # red channel
        green_overlay[:, :, 2] = np.zeros((256, 256)) # blue channel

        imarray = imarray.astype(np.int64)

        final = np.where(overlay==255, green_overlay, imarray)
        final = final.astype(np.int8)
        final = Image.fromarray(np.uint8(final))

        # Save overlay image to bytes
        
        final_bytes = io.BytesIO()
        final.save(final_bytes, format='PNG')
        final_bytes = final_bytes.getvalue()

        # Return overlay

        return Response(content=final_bytes, media_type="image/png")

    except Exception as e:
        return {
            "status": 500,
            "message": e
        }


"""
For local testing, run:

    modal run main.py
"""
@stub.local_entrypoint()
def main():
    response = run_model.remote()
    print(response)