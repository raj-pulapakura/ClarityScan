import numpy as np
from PIL import Image
import io

from config.model import *


def threshold_prediction(prediction: np.ndarray):
    prediction = prediction.copy()
    prediction[prediction < SEGMENTATION_PREDICTION_THRESHOLD] = 0
    prediction[prediction >= SEGMENTATION_PREDICTION_THRESHOLD] = 255
    return prediction


def get_green_mask(binary_mask: np.ndarray):
    import numpy as np

    green_mask = binary_mask.copy()
    green_mask[:, :, 0] = np.zeros(MODEL_INPUT_SHAPE) # red channel
    green_mask[:, :, 2] = np.zeros(MODEL_INPUT_SHAPE) # blue channel

    return green_mask


def get_overlay(binary_mask: np.ndarray, color_mask: np.ndarray, img_array: np.ndarray):
    import numpy as np
    
    overlay = np.where(binary_mask==255, color_mask, img_array.astype(np.int64))

    return overlay


def rescale_and_correct_denoising_prediction(pred: np.ndarray, correction_amount=0.15):
    """
    Problem:
    The distribution of denoising model prediction (Y_hat) tend to be slightly shifted toward the right, compared to the ground truth (Y)
    This has the effect of making the image slightly brighter, which is especially noticeable in the background as black becomes gray.
    
    Solution:
    To fix this, we do the following steps:
    - Scale Y_hat to range [0, 1] using min-max scaling 
    - Shift Y_hat to the left by some correction_amount, by subtracting this correction_amount from Y_hat.
    - This will probably incur some negative pixel values, so we clip the pixels to the range (0, 1).
    - Then, we rescale up by 255.0
    - Finally, we convert to uint8

    correction_amount: float
        - Should be approx. in the range [0, 1]
    """
    pred = (pred - np.min(pred)) / (np.max(pred) - np.min(pred))
    pred -= correction_amount
    pred = np.clip(pred, 0.0, 1.0)
    pred *= 255.0
    pred = np.uint8(pred)
    return pred

def pil_image_to_bytearray(array: Image.Image):
    import io

    bytearray = io.BytesIO()
    array.save(bytearray, format='PNG')

    return bytearray


def bytearray_to_bytes(bytearray: io.BytesIO):
    return bytearray.getvalue()


def zip_list_of_bytearrays(list_of_bytearrays: list[io.BytesIO], file_names: list[str]):
    from zipfile import ZipFile

    # Check for length mismatch
    if len(list_of_bytearrays) != len(file_names):
        raise Exception(
            f"Length of bytearrays must be equal to length of file_names. Received {len(list_of_bytearrays)} and {len(file_names)}"
        )

    # Create a byte stream buffer for the ZIP file
    zip_buffer = io.BytesIO()

    # Initialize ZIP file creation
    with ZipFile(zip_buffer, 'w') as zip_file:
        for i in range(len(list_of_bytearrays)):
            bytearray = list_of_bytearrays[i]
            file_name = file_names[i]

            bytearray.seek(0)  # Go to the beginning of the BytesIO buffer
            zip_file.writestr(file_name, bytearray.getvalue())

    # Move the cursor to the beginning of the BytesIO buffer
    zip_buffer.seek(0)

    return zip_buffer