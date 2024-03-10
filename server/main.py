from modal import web_endpoint, CloudBucketMount, Secret, gpu
from fastapi import UploadFile, Response

from setup import stub, image
from config.model import *
from config.container import *
from models.TumorSegmentationModel import TumorSegmentationModel
from models.DenoisingModel import DenoisingModel


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
def run_segmentation_model(file: UploadFile):
    try:
        import tensorflow as tf

        print(f"[INFO] Tensorflow version: {tf.__version__}")

        prediction_bytes = TumorSegmentationModel().inference.remote(file)

        return Response(content=prediction_bytes, media_type="image/png")

    except Exception as e:
        return {
            "status": 500,
            "message": e
        }


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
def run_denoiser_model(file: UploadFile):
    try:
        import tensorflow as tf

        print(f"[INFO] Tensorflow version: {tf.__version__}")

        prediction_bytes = DenoisingModel().inference.remote(file)

        return Response(content=prediction_bytes, media_type="image/png")

    except Exception as e:
        return {
            "status": 500,
            "message": e
        }
