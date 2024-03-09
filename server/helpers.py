import modal
from stub import stub, tf_image
from volumes import volume

@stub.function(
    image=tf_image, 
    secrets=[modal.Secret.from_name("my-aws-secret")],
    volumes={"/my_vol": volume}
)
def load_model(verbose=False):
    try:
        import boto3
        s3 = boto3.client("s3")
        BUCKET_NAME = "brain-tumor-segmentation-model"
        FOLDER_NAME = "models"
        FILE_NAME = "tumor_segmentation.keras"
        if verbose: print("Loading model from: " + f"{BUCKET_NAME}/{FOLDER_NAME}/{FILE_NAME}")
        s3.download_file(BUCKET_NAME, FOLDER_NAME+"/"+FILE_NAME, FILE_NAME)
        if verbose: print("Loaded model")
        volume.commit() # commit changes to volume
    except Exception as error:
        if verbose: print("Unable to download model file from S3")
        if verbose: print(error)
