import pandas as pd

from fastapi import APIRouter, HTTPException

import app.utils.state as state

from app.services.training_service import (
    train_model,
)

router = APIRouter()


@router.post("/train")
def train_model_endpoint():

    if state.CURRENT_DATASET is None:
        raise HTTPException(
            status_code=400,
            detail="No dataset has been uploaded.",
        )

    if state.CURRENT_TARGET is None:
        raise HTTPException(
            status_code=400,
            detail="Target column has not been selected.",
        )

    try:

        df = pd.read_csv(
            state.CURRENT_DATASET
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Unable to load dataset: {str(e)}",
        )

    try:

        result = train_model(
            df=df,
            target_column=state.CURRENT_TARGET,
        )

        state.CURRENT_TASK = result["task"]

        state.CURRENT_MODEL = result["model"]

        state.CURRENT_METRICS = result["metrics"]

        state.CURRENT_X_TEST = result["X_test"]

        state.CURRENT_Y_TEST = result["y_test"]

        state.CURRENT_PREDICTIONS = result["predictions"]

        return {

            "success": True,

            "message": "Model trained successfully.",

            "data": {

                "task": result["task"],

                "metrics": result["metrics"],

            },

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Training failed: {str(e)}",
        )