from modal import web_endpoint, CloudBucketMount, Secret, gpu
from fastapi import UploadFile, Response
from fastapi.responses import StreamingResponse

from setup import stub, image
from config.model import *
from config.container import *
from models.TumorSegmentationModel import TumorSegmentationModel
from models.DenoisingModel import DenoisingModel
from processing.postprocessing import zip_list_of_bytearrays


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
    timeout=CONTAINER_EXECUTION_TIMEOUT
)
@web_endpoint(method="POST")
def run_segmentation_model(file: UploadFile):
    try:
        import tensorflow as tf

        print(f"[INFO] Tensorflow version: {tf.__version__}")

        overlay_bytes, green_mask_bytes = TumorSegmentationModel().inference.remote(file)

        print(f"[INFO] Zipping overlay and mask into one file")
        prediction_zip = zip_list_of_bytearrays([overlay_bytes, green_mask_bytes], ["overlay.png", "mask.png"])

        return StreamingResponse(content=prediction_zip, media_type="application/x-zip-compressed",
                             headers={"Content-Disposition": "attachment; filename=prediction.zip"})

    except Exception as e:
        print("[ERROR]")
        print(e)
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
    timeout=CONTAINER_EXECUTION_TIMEOUT
)
@web_endpoint(method="POST")
def run_denoiser_model(file: UploadFile):
    try:
        import tensorflow as tf

        print(f"[INFO] Tensorflow version: {tf.__version__}")

        prediction_bytes = DenoisingModel().inference.remote(file)

        print(f"[INFO] Zipping overlay and mask into one file")
        prediction_zip = zip_list_of_bytearrays([prediction_bytes], ["denoised.png"])

        return StreamingResponse(content=prediction_zip, media_type="application/x-zip-compressed",
                             headers={"Content-Disposition": "attachment; filename=prediction.zip"})

    except Exception as e:
        return {
            "status": 500,
            "message": e
        }
