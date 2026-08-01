from fastapi import (
    APIRouter,
    HTTPException,
)

import app.utils.state as state

from app.services.explainability_service import (
    generate_classification_report,
    generate_regression_report,
    get_feature_importance,
    generate_shap_explanation,
)

router = APIRouter()


@router.get("/explain")
def explain_model():

    if state.CURRENT_MODEL is None:

        raise HTTPException(

            status_code=400,

            detail="No trained model found.",

        )

    task = state.CURRENT_TASK

    if task == "classification":

        report = (
            generate_classification_report(

                state.CURRENT_Y_TEST,

                state.CURRENT_PREDICTIONS,

            )
        )

    else:

        report = (
            generate_regression_report(

                state.CURRENT_Y_TEST,

                state.CURRENT_PREDICTIONS,

            )
        )

    feature_importance = (
        get_feature_importance(

            state.CURRENT_MODEL,

        )
    )

    shap_summary = (
        generate_shap_explanation(

            state.CURRENT_MODEL,

            state.CURRENT_X_TEST,

        )
    )

    state.CURRENT_EXPLANATION = {

        "report": report,

        "feature_importance": feature_importance,

        "shap_summary": shap_summary,

    }

    return {

        "success": True,

        "message": "Explainability generated successfully.",

        "data": state.CURRENT_EXPLANATION,

    }