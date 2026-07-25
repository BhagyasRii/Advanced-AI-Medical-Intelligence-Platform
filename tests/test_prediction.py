from src.inference.loader import load_model
from src.inference.predictor import predict_image

CHECKPOINT_PATH = "artifacts/best_model.pth"

IMAGE_PATH = "data/test_images/tuberculosys1.jpeg"

model = load_model(CHECKPOINT_PATH)

result = predict_image(
    model=model,
    image_path=IMAGE_PATH,
)

print("\nPrediction Result")
print(result)
print(type(result))