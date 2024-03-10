import numpy as np
from PIL import Image

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


def array_to_bytes(array: Image.Image):
    import io

    bytes = io.BytesIO()
    array.save(bytes, format='PNG')
    bytes = bytes.getvalue()

    return bytes