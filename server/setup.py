import modal
from modal import Image

stub = modal.Stub("brain-tumor-analysis")

image = Image.debian_slim().pip_install(
    "tensorflow[and-cuda]==2.12.0",
    "boto3",
    "pillow",
    "numpy",
)