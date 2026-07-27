import json

from sqlalchemy.orm import Session

from src.database.models import Prediction


# ---------------------------------------------------------
# SAVE
# ---------------------------------------------------------

def save_prediction(
    db: Session,
    user_id: int,
    filename: str,
    prediction: str,
    confidence: float,
    probabilities: dict,
):

    row = Prediction(
        user_id=user_id,
        filename=filename,
        prediction=prediction,
        confidence=confidence,
        probabilities=json.dumps(probabilities),
    )

    db.add(row)
    db.commit()
    db.refresh(row)

    return row


# ---------------------------------------------------------
# UPDATE
# ---------------------------------------------------------

def update_prediction(
    db: Session,
    prediction_id: int,
    report: str,
    gradcam_image: str,
):

    row = (
        db.query(Prediction)
        .filter(Prediction.id == prediction_id)
        .first()
    )

    if row is None:
        return None

    row.report = report
    row.gradcam_image = gradcam_image

    db.commit()
    db.refresh(row)

    return row


# ---------------------------------------------------------
# GET SINGLE
# ---------------------------------------------------------

def get_prediction(
    db: Session,
    prediction_id: int,
):

    return (
        db.query(Prediction)
        .filter(Prediction.id == prediction_id)
        .first()
    )


# ---------------------------------------------------------
# GET USER HISTORY
# ---------------------------------------------------------

def get_predictions(
    db: Session,
    user_id: int,
):

    return (
        db.query(Prediction)
        .filter(Prediction.user_id == user_id)
        .order_by(Prediction.created_at.desc())
        .all()
    )


# ---------------------------------------------------------
# DELETE
# ---------------------------------------------------------

def delete_prediction(
    db: Session,
    prediction_id: int,
):

    row = get_prediction(
        db,
        prediction_id,
    )

    if row:

        db.delete(row)
        db.commit()

    return row