from fastapi import APIRouter, HTTPException

import app.utils.state as state

router = APIRouter()


@router.get("/failure-map")
def get_failure_map():
    """
    Returns the generated failure map after model training.
    """

    if state.CURRENT_FAILURE_MAP is None:
        raise HTTPException(
            status_code=400,
            detail="No failure map available. Train a model first.",
        )

    failure_map = state.CURRENT_FAILURE_MAP

    return {
        "success": True,
        "message": "Failure map generated successfully.",
        "data": {
            "summary": failure_map["summary"],
            "samples": failure_map["failure_dataframe"]
            .head(20)
            .to_dict(orient="records"),
        },
    }