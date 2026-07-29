from fastapi import APIRouter, HTTPException

import pandas as pd

import app.utils.state as state

from app.services.ai_failure_analysis_service import (
    generate_ai_failure_analysis,
)

router = APIRouter()


@router.get("/ai-analysis")
def get_ai_analysis():

    if state.CURRENT_MODEL is None:

        raise HTTPException(
            status_code=400,
            detail="No trained model available."
        )

    feature_importances = None

    model = state.CURRENT_MODEL.named_steps["model"]

    if hasattr(model, "feature_importances_"):

        preprocessor = state.CURRENT_MODEL.named_steps["preprocessor"]

        feature_names = preprocessor.get_feature_names_out()

        feature_importances = pd.DataFrame({

            "Feature": feature_names,

            "Importance": model.feature_importances_

        }).sort_values(
            by="Importance",
            ascending=False
        )

    analysis = generate_ai_failure_analysis(

        metrics=state.CURRENT_METRICS,

        failure_regions=state.CURRENT_FAILURE_REGIONS,

        feature_importances=feature_importances,

    )

    state.CURRENT_AI_ANALYSIS = analysis

    return {

        "success": True,

        "message": "AI analysis generated successfully.",

        "data": analysis

    }