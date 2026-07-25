from fastapi import APIRouter, HTTPException

import app.utils.state as state

router = APIRouter()


@router.get("/failure-regions")
def get_failure_regions():

    if state.CURRENT_FAILURE_REGIONS is None:

        raise HTTPException(
            status_code=400,
            detail="Failure regions not available. Train a model first.",
        )

    return {

        "success": True,

        "message": "Failure regions generated successfully.",

        "data": {

            "regions": state.CURRENT_FAILURE_REGIONS

        },

    }