from fastapi import HTTPException


class InvalidImageException(HTTPException):

    def __init__(self):

        super().__init__(
            status_code=400,
            detail="Invalid image file.",
        )


class PredictionException(HTTPException):

    def __init__(self, message):

        super().__init__(
            status_code=500,
            detail=message,
        )


class ReportGenerationException(HTTPException):

    def __init__(self):

        super().__init__(
            status_code=500,
            detail="Failed to generate medical report.",
        )