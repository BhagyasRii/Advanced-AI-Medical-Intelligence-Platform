from src.inference.loader import load_model
from src.inference.predictor import predict_image
from src.llm.report_generator import generate_medical_report

CHECKPOINT_PATH = "artifacts/best_model.pth"

IMAGE_PATH = "data/test_images/covid1.jpg"

model = load_model(CHECKPOINT_PATH)

result = predict_image(
    model=model,
    image_path=IMAGE_PATH,
)

report = generate_medical_report(result)

print("\nMedical Report")
print(report)
print(type(report))