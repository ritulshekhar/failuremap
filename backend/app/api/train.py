import pandas as pd

import app.utils.state as state

from fastapi import (
    APIRouter,
    HTTPException
)

from app.models.train import (
    TrainRequest
)

from app.services.training_service import (
    train_model
)

router = APIRouter()

@router.post("/train")
def train_endpoint(
    request: TrainRequest
):

    if state.CURRENT_DATASET is None:

        raise HTTPException(
            status_code=400,
            detail="No dataset uploaded"
        )

    df = pd.read_csv(
        state.CURRENT_DATASET
    )

    metrics = train_model(
        df,
        request.target
    )

    return metrics