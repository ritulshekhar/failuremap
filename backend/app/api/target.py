import pandas as pd

import app.utils.state as state

from fastapi import APIRouter, HTTPException

from app.models.target import TargetRequest

router = APIRouter()


@router.post("/select-target")
def select_target(
    request: TargetRequest
):

    if state.CURRENT_DATASET is None:

        raise HTTPException(
            status_code=400,
            detail="No dataset uploaded"
        )

    df = pd.read_csv(
        state.CURRENT_DATASET
    )

    target_col = request.target

    if target_col not in df.columns:

        raise HTTPException(
            status_code=400,
            detail="Invalid target column"
        )

    unique_values = (
        df[target_col]
        .nunique()
    )

    task_type = (
        "classification"
        if unique_values < 20
        else "regression"
    )

    return {
        "target": target_col,
        "task": task_type
    }