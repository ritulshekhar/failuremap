from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    root_mean_squared_error,
    r2_score,
)


def calculate_metrics(
    task_type,
    y_true,
    predictions,
):

    if task_type == "classification":

        return {

            "accuracy": round(
                accuracy_score(
                    y_true,
                    predictions,
                ),
                4,
            ),

            "precision": round(
                precision_score(
                    y_true,
                    predictions,
                    average="weighted",
                    zero_division=0,
                ),
                4,
            ),

            "recall": round(
                recall_score(
                    y_true,
                    predictions,
                    average="weighted",
                    zero_division=0,
                ),
                4,
            ),

            "f1": round(
                f1_score(
                    y_true,
                    predictions,
                    average="weighted",
                    zero_division=0,
                ),
                4,
            ),

        }

    return {

        "mae": round(
            mean_absolute_error(
                y_true,
                predictions,
            ),
            4,
        ),

        "rmse": round(
            root_mean_squared_error(
                y_true,
                predictions,
            ),
            4,
        ),

        "r2": round(
            r2_score(
                y_true,
                predictions,
            ),
            4,
        ),

    }