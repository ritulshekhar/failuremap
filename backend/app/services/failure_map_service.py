import pandas as pd


def generate_failure_map(
    X_test: pd.DataFrame,
    y_true,
    y_pred,
    label_encoder=None,
):
    """
    Creates a dataframe containing:
    - Original test features
    - Actual value
    - Predicted value
    - Correct / Incorrect flag
    """

    failure_df = X_test.copy()

    actual = y_true
    predicted = y_pred

    if label_encoder is not None:
        actual = label_encoder.inverse_transform(actual)
        predicted = label_encoder.inverse_transform(predicted)

    failure_df["actual"] = actual
    failure_df["predicted"] = predicted

    failure_df["correct"] = (
        failure_df["actual"] == failure_df["predicted"]
    )

    failure_df["error"] = ~failure_df["correct"]

    summary = {
        "total_samples": len(failure_df),
        "correct_predictions": int(failure_df["correct"].sum()),
        "incorrect_predictions": int(failure_df["error"].sum()),
        "accuracy": round(
            failure_df["correct"].mean(),
            4,
        ),
    }

    return {
        "failure_dataframe": failure_df,
        "summary": summary,
    }