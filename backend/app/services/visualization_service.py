import os

import matplotlib.pyplot as plt
import pandas as pd

OUTPUT_DIR = "outputs"


def ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


def generate_failure_region_chart(failure_regions):

    ensure_output_dir()

    if len(failure_regions) == 0:
        return None

    top_regions = failure_regions[:10]

    labels = [
        region["condition"]
        for region in top_regions
    ]

    scores = [
        region["risk_score"]
        for region in top_regions
    ]

    plt.figure(figsize=(10, 6))

    plt.barh(labels, scores)

    plt.xlabel("Risk Score")

    plt.ylabel("Failure Region")

    plt.title("Top Failure Regions")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "failure_regions.png",
    )

    plt.savefig(path)

    plt.close()

    return path


def generate_feature_importance_chart(
    model,
    feature_names,
):

    ensure_output_dir()

    if not hasattr(
        model,
        "feature_importances_",
    ):
        return None

    importance = model.feature_importances_

    importance_df = pd.DataFrame(
        {
            "Feature": feature_names,
            "Importance": importance,
        }
    )

    importance_df = importance_df.sort_values(
        by="Importance",
        ascending=False,
    )

    plt.figure(figsize=(10, 6))

    plt.bar(
        importance_df["Feature"],
        importance_df["Importance"],
    )

    plt.xticks(rotation=45, ha="right")

    plt.ylabel("Importance")

    plt.title("Feature Importance")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "feature_importance.png",
    )

    plt.savefig(path)

    plt.close()

    return path


def generate_prediction_distribution_chart(
    predictions,
):

    ensure_output_dir()

    prediction_series = pd.Series(
        predictions
    )

    counts = prediction_series.value_counts()

    plt.figure(figsize=(6, 5))

    plt.bar(
        counts.index.astype(str),
        counts.values,
    )

    plt.xlabel("Predicted Class")

    plt.ylabel("Count")

    plt.title("Prediction Distribution")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "prediction_distribution.png",
    )

    plt.savefig(path)

    plt.close()

    return path