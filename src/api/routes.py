import traceback

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)

from src.api.dependencies import get_model
from src.api.schemas import (
    MedicalReportResponse,
    PredictionResponse,
)

from src.inference.predictor import predict_image
from src.llm.report_generator import generate_medical_report

from src.utils.file_manager import (
    delete_file,
    save_upload,
)

from src.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(
    prefix="/api",
    tags=["Medical AI"],
)


@router.post(
    "/predict",
    response_model=PredictionResponse,
)
async def predict(
    file: UploadFile = File(...),
    model=Depends(get_model),
):
    """
    Upload a chest X-ray and generate
    prediction + AI report.
    """

    if not file.filename.lower().endswith(
        (".png", ".jpg", ".jpeg")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only PNG/JPG/JPEG images are supported.",
        )

    image_path = None

    try:

        logger.info("Uploading image...")

        image_path = save_upload(file)

        logger.info("Running inference...")

        prediction = predict_image(
            model=model,
            image_path=str(image_path),
        )

        logger.info("Generating AI report...")

        report = generate_medical_report(
            prediction,
        )

        logger.info("Prediction completed successfully.")

        return PredictionResponse(
            prediction=prediction.prediction,
            confidence=prediction.confidence,
            probabilities=prediction.probabilities,
            medical_report=MedicalReportResponse(
                diagnosis=report.diagnosis,
                findings=report.findings,
                confidence_analysis=report.confidence_analysis,
                recommendations=report.recommendations,
                patient_explanation=report.patient_explanation,
                disclaimer=report.disclaimer,
            ),
        )

    except Exception as e:

        logger.error(traceback.format_exc())

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        if image_path:

            delete_file(image_path)