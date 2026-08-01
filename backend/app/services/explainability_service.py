import shap
import pandas as pd

from sklearn.metrics import (
    confusion_matrix,
    classification_report,
)


# Classification Report

def generate_classification_report(
    y_true,
    predictions,
):

    report = classification_report(
        y_true,
        predictions,
        output_dict=True,
        zero_division=0,
    )

    matrix = confusion_matrix(
        y_true,
        predictions,
    )

    return {

        "classification_report": report,

        "confusion_matrix": matrix.tolist(),

    }


# Regression Report

def generate_regression_report(
    y_true,
    predictions,
):

    errors = y_true - predictions

    return {

        "mean_error": float(errors.mean()),

        "max_error": float(errors.max()),

        "min_error": float(errors.min()),

        "absolute_error": float(errors.abs().mean()),

    }


# Feature Importance

def get_feature_importance(
    pipeline,
):

    model = pipeline.named_steps["model"]

    if not hasattr(
        model,
        "feature_importances_",
    ):
        return []

    preprocessor = pipeline.named_steps[
        "preprocessor"
    ]

    feature_names = (
        preprocessor.get_feature_names_out()
    )

    importance_df = pd.DataFrame(
        {

            "feature": feature_names,

            "importance":
            model.feature_importances_,

        }
    )

    importance_df = (
        importance_df
        .sort_values(
            by="importance",
            ascending=False,
        )
    )

    return (
        importance_df
        .head(15)
        .to_dict(
            orient="records"
        )
    )


# SHAP Explainability

def generate_shap_explanation(
    pipeline,
    X_test,
):

    preprocessor = pipeline.named_steps[
        "preprocessor"
    ]

    model = pipeline.named_steps[
        "model"
    ]

    X_processed = preprocessor.transform(
        X_test
    )

    feature_names = (
        preprocessor.get_feature_names_out()
    )

    explainer = shap.TreeExplainer(
        model
    )

    shap_values = explainer.shap_values(
        X_processed
    )

    # Handle different SHAP output formats

    if isinstance(shap_values, list):

        values = abs(
            shap_values[0]
        ).mean(axis=0)

    else:

        import numpy as np

        shap_values = np.asarray(
            shap_values
        )

        if shap_values.ndim == 3:

            values = abs(
                shap_values
            ).mean(axis=(0, 2))

        elif shap_values.ndim == 2:

            values = abs(
                shap_values
            ).mean(axis=0)

        else:

            values = abs(
                shap_values
            )

    shap_df = pd.DataFrame({

        "feature": feature_names,

        "importance": values,

    })

    shap_df = (
        shap_df
        .sort_values(
            by="importance",
            ascending=False,
        )
    )

    return (
        shap_df
        .head(15)
        .to_dict(
            orient="records"
        )
    )