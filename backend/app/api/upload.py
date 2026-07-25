import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from app.services.dataset_service import (
    profile_dataset
)

import app.utils.state as state

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/upload")
async def upload_csv(
    file: UploadFile = File(...)
):

    if not file.filename.endswith(
        ".csv"
    ):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
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
        "message":
        "Upload successful",

        "filename":
        file.filename,

        "summary":
        summary
    }