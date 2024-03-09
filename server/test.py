import boto3

s3 = boto3.client("s3")
BUCKET_NAME = "brain-tumor-segmentation-model"
FOLDER_NAME = "models"
FILE_NAME = "tumor_segmentation.keras"
print("Downloading...")
s3.download_file(BUCKET_NAME, FOLDER_NAME+"/"+FILE_NAME, FILE_NAME)
print("Finished downloading: " + FILE_NAME)