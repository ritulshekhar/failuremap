from fastapi import APIRouter, HTTPException

import app.utils.state as state

router = APIRouter()


@router.get("/visualizations")
def get_visualizations():

    if state.CURRENT_VISUALIZATIONS is None:

        raise HTTPException(
            status_code=400,
            detail="Visualizations not available. Train a model first.",
        )

    return {

        "success": True,

        "message": "Visualizations generated successfully.",

        "data": state.CURRENT_VISUALIZATIONS,

    }