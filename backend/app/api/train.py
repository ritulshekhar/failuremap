import pandas as pd

from fastapi import APIRouter, HTTPException

import app.utils.state as state

from app.services.training_service import train_model
from app.services.failure_map_service import generate_failure_map
from app.services.failure_region_service import discover_failure_regions

from app.services.visualization_service import (
    generate_failure_region_chart,
    generate_feature_importance_chart,
    generate_prediction_distribution_chart,
    generate_correlation_heatmap,
    generate_error_distribution_chart,
    generate_failed_feature_distribution,
)

router = APIRouter()


@router.post("/train")
def train_model_endpoint():

    # ----------------------------------------
    # Validation
    # ----------------------------------------

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

    # ----------------------------------------
    # Load Dataset
    # ----------------------------------------

    try:

        df = pd.read_csv(
            state.CURRENT_DATASET
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Unable to load dataset: {str(e)}",
        )

    # ----------------------------------------
    # Training Pipeline
    # ----------------------------------------

    try:

        result = train_model(
            df=df,
            target_column=state.CURRENT_TARGET,
        )

        # ----------------------------------------
        # Store Model State
        # ----------------------------------------

        state.CURRENT_TASK = result["task"]

        state.CURRENT_MODEL = result["model"]

        state.CURRENT_METRICS = result["metrics"]

        state.CURRENT_X_TEST = result["X_test"]

        state.CURRENT_Y_TEST = result["y_test"]

        state.CURRENT_PREDICTIONS = result["predictions"]

        state.CURRENT_LABEL_ENCODER = result["label_encoder"]

        # ----------------------------------------
        # Failure Map
        # ----------------------------------------

        failure_map = generate_failure_map(
            X_test=result["X_test"],
            y_true=result["y_test"],
            y_pred=result["predictions"],
            label_encoder=result["label_encoder"],
        )

        state.CURRENT_FAILURE_MAP = failure_map

        # ----------------------------------------
        # Failure Regions
        # ----------------------------------------

        failure_regions = discover_failure_regions(
            failure_map["failure_dataframe"]
        )

        state.CURRENT_FAILURE_REGIONS = failure_regions

        # ----------------------------------------
        # Visualizations
        # ----------------------------------------

        failure_chart = generate_failure_region_chart(
            failure_regions
        )

        feature_chart = generate_feature_importance_chart(
            result["model"]
        )

        prediction_chart = generate_prediction_distribution_chart(
            result["predictions"]
        )

        correlation_chart = generate_correlation_heatmap(
            df
        )

        error_chart = generate_error_distribution_chart(
            failure_map["failure_dataframe"]
        )

        failed_distribution_chart = (
            generate_failed_feature_distribution(
                failure_map["failure_dataframe"]
            )
        )

        state.CURRENT_VISUALIZATIONS = {

            "failure_region_chart": failure_chart,

            "feature_importance_chart": feature_chart,

            "prediction_distribution_chart": prediction_chart,

            "correlation_heatmap": correlation_chart,

            "error_distribution_chart": error_chart,

            "failed_feature_distribution": failed_distribution_chart,

        }

        # ----------------------------------------
        # Console Logs
        # ----------------------------------------

        print("\n========== TRAINING COMPLETE ==========")

        print("Task:")
        print(result["task"])

        print("\nMetrics:")
        print(result["metrics"])

        print("\nFailure Summary:")
        print(failure_map["summary"])

        print("\nFailure Regions:")
        print(len(failure_regions))

        print("\nVisualizations:")
        print(state.CURRENT_VISUALIZATIONS)

        print("=======================================\n")

        # ----------------------------------------
        # API Response
        # ----------------------------------------

        return {

            "success": True,

            "message": "Model trained successfully.",

            "data": {

                "task": result["task"],

                "metrics": result["metrics"],

                "failure_summary": failure_map["summary"],

                "failure_regions_found": len(
                    failure_regions
                ),

                "visualizations": state.CURRENT_VISUALIZATIONS,

            },

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Training failed: {str(e)}",
        )