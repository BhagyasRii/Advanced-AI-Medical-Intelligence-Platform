import json
import time
from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from src.api.dependencies import get_model
from src.api.schemas import (
    PredictionHistoryResponse,
    PredictionResponse,
)

from src.auth.dependencies import get_current_user

from src.database.database import get_db
from src.database.crud import (
    delete_prediction,
    get_prediction,
    get_predictions,
    save_prediction,
    update_prediction,
)

from src.database.models import Prediction

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


# ---------------------------------------------------------
# HEALTH
# ---------------------------------------------------------

@router.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "Advanced AI Medical Intelligence Platform",
    }


# ---------------------------------------------------------
# PREDICT
# ---------------------------------------------------------

@router.post(
    "/predict",
    response_model=PredictionResponse,
)
async def predict(
    file: UploadFile = File(...),
    model=Depends(get_model),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    start_time = time.perf_counter()

    logger.info("=" * 80)
    logger.info("Prediction request received")

    if not file.filename.lower().endswith(
        (".png", ".jpg", ".jpeg")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only PNG, JPG and JPEG files are supported.",
        )

    image_path = None

    try:

        logger.info("Saving uploaded image...")

        image_path = save_upload(file)

        logger.info(f"Saved to: {image_path}")

        logger.info("Running inference...")

        prediction = predict_image(
            model=model,
            image_path=image_path,
        )

        logger.info(
            f"Prediction : {prediction.prediction}"
        )

        logger.info(
            f"Confidence : {prediction.confidence:.4f}"
        )

        db_prediction = save_prediction(
            db=db,
            user_id=current_user.id,
            filename=file.filename,
            prediction=prediction.prediction,
            confidence=prediction.confidence,
            probabilities=prediction.probabilities,
        )

        logger.info(
            f"Prediction stored with ID {db_prediction.id}"
        )

        report = generate_medical_report(
            prediction
        )

        update_prediction(
            db=db,
            prediction_id=db_prediction.id,
            report=report.model_dump_json(indent=2),
            gradcam_image=str(prediction.gradcam_path),
        )

        elapsed = time.perf_counter() - start_time

        logger.info(
            f"Completed in {elapsed:.2f} seconds"
        )

        logger.info("=" * 80)

        return PredictionResponse(
            prediction=prediction.prediction,
            id=db_prediction.id,
            medical_report=report,
        )

    except HTTPException:
        raise
    except Exception as e:

        logger.exception(e)

        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing the image. Please try again with a valid medical image.",
        ) from e

    finally:

        if image_path is not None:

            try:
                delete_file(image_path)
            except Exception:
                pass


# ---------------------------------------------------------
# HISTORY
# ---------------------------------------------------------

@router.get(
    "/history",
    response_model=list[PredictionHistoryResponse],
)
def history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    rows = get_predictions(
        db=db,
        user_id=current_user.id,
    )

    response = []

    for row in rows:

        response.append(

            PredictionHistoryResponse(
                id=row.id,
                prediction=row.prediction,
                created_at=str(row.created_at),
            )

        )

    return response


# ---------------------------------------------------------
# GET SINGLE PREDICTION
# ---------------------------------------------------------

@router.get("/history/{prediction_id}")
def prediction_history(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    row = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.user_id == current_user.id,
        )
        .first()
    )

    if row is None:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found.",
        )

    return {

        "id": row.id,
        "filename": row.filename,
        "prediction": row.prediction,
        "confidence": row.confidence,
        "probabilities": json.loads(
            row.probabilities
        ),
        "report": json.loads(row.report)
        if row.report
        else None,
        "gradcam_image": row.gradcam_image,
        "created_at": row.created_at,

    }


# ---------------------------------------------------------
# DELETE
# ---------------------------------------------------------

@router.delete("/history/{prediction_id}")
def remove_prediction(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    row = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.user_id == current_user.id,
        )
        .first()
    )

    if row is None:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found.",
        )

    if row.gradcam_image:

        gradcam = Path(row.gradcam_image)

        if gradcam.exists():

            gradcam.unlink()

    db.delete(row)
    db.commit()

    logger.info(
        f"Prediction {prediction_id} deleted."
    )

    return {

        "message": "Prediction deleted successfully."

    }