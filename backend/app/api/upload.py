import os
import uuid

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
)

from app.services.dataset_service import profile_dataset
import app.utils.state as state

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True,
)


@router.post("/upload")
async def upload_csv(
    file: UploadFile = File(...)
):

    if file.filename is None:

        raise HTTPException(
            status_code=400,
            detail="No file selected.",
        )

    if not file.filename.lower().endswith(".csv"):

        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed.",
        )

    unique_filename = (
        f"{uuid.uuid4().hex}_{file.filename}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename,
    )

    try:

        with open(
            file_path,
            "wb",
        ) as buffer:

            while chunk := await file.read(
                1024 * 1024
            ):
                buffer.write(chunk)

        state.CURRENT_DATASET = file_path

        summary = profile_dataset(
            file_path
        )

        return {

            "success": True,

            "message": "Dataset uploaded successfully.",

            "data": {

                "filename": file.filename,

                "summary": summary,

            },

        }

    except Exception as e:

        if os.path.exists(
            file_path
        ):
            os.remove(
                file_path
            )

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )