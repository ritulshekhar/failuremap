from fastapi import APIRouter, HTTPException

import app.utils.state as state

router = APIRouter()


@router.get("/failure-map")
def get_failure_map():

    if state.CURRENT_FAILURE_MAP is None:

        raise HTTPException(
            status_code=400,
            detail="No failure map available. Train a model first.",
        )

    failure_df = state.CURRENT_FAILURE_MAP["failure_dataframe"]

    summary = state.CURRENT_FAILURE_MAP["summary"]

    return {

        "success": True,

        "message": "Failure map generated.",

        "data": {

            "summary": summary,

            "samples": failure_df.to_dict(
                orient="records"
            ),

        },

    }