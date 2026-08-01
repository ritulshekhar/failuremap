import pandas as pd

from fastapi import APIRouter, HTTPException

import app.utils.state as state
from app.models.target import TargetRequest

router = APIRouter()


@router.post("/target")
def select_target(request: TargetRequest):

    if state.CURRENT_DATASET is None:
        raise HTTPException(
            status_code=400,
            detail="No dataset has been uploaded.",
        )

    try:
        df = pd.read_csv(state.CURRENT_DATASET)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load dataset: {str(e)}",
        )

    target = request.target

    if target not in df.columns:
        raise HTTPException(
            status_code=400,
            detail="Invalid target column.",
        )

    unique_values = df[target].nunique(dropna=True)

    task = (
        "classification"
        if unique_values < 20
        else "regression"
    )

    # Save project state
    state.CURRENT_TARGET = target
    state.CURRENT_TASK = task

    return {
        "success": True,
        "message": "Target selected successfully.",
        "data": {
            "target": target,
            "task": task,
            "unique_values": int(unique_values),
        },
    }