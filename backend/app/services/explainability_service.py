import pandas as pd

from sklearn.metrics import (
    confusion_matrix,
    classification_report,
)


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


def generate_regression_report(
    y_true,
    predictions,
):

    errors = (
        y_true - predictions
    )

    return {

        "mean_error":
        float(errors.mean()),

        "max_error":
        float(errors.max()),

        "min_error":
        float(errors.min()),

        "absolute_error":
        float(errors.abs().mean()),

    }


def get_feature_importance(
    pipeline,
    feature_names,
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

    transformed_names = (
        preprocessor.get_feature_names_out()
    )

    importances = (
        model.feature_importances_
    )

    importance_df = pd.DataFrame(
        {

            "feature":
            transformed_names,

            "importance":
            importances,

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