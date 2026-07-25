from fastapi import (
    APIRouter,
    HTTPException,
)

import app.utils.state as state

from app.services.explainability_service import (
    generate_classification_report,
    generate_regression_report,
    get_feature_importance,
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

    model = state.CURRENT_MODEL

    y_test = state.CURRENT_Y_TEST

    predictions = state.CURRENT_PREDICTIONS

    X_test = state.CURRENT_X_TEST

    if task == "classification":

        explanation = (
            generate_classification_report(
                y_test,
                predictions,
            )
        )

    else:

        explanation = (
            generate_regression_report(
                y_test,
                predictions,
            )
        )

    explanation[
        "feature_importance"
    ] = get_feature_importance(
        model,
        X_test.columns,
    )

    state.CURRENT_EXPLANATION = (
        explanation
    )

    return {

        "success": True,

        "message":
        "Explanation generated.",

        "data":
        explanation,

    }