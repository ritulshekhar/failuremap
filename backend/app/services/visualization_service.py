import os

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd


OUTPUT_DIR = "outputs"


def ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


# ---------------------------------------------------
# Failure Region Chart
# ---------------------------------------------------

def generate_failure_region_chart(failure_regions):

    ensure_output_dir()

    if len(failure_regions) == 0:
        return None

    top_regions = failure_regions[:10]

    labels = [r["condition"] for r in top_regions]
    scores = [r["risk_score"] for r in top_regions]

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

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )
    plt.close()

    return path


# ---------------------------------------------------
# Feature Importance
# ---------------------------------------------------

def generate_feature_importance_chart(
    pipeline,
    feature_names=None,
):

    ensure_output_dir()

    # Extract trained model
    if hasattr(pipeline, "named_steps"):

        model = pipeline.named_steps["model"]

        preprocessor = pipeline.named_steps["preprocessor"]

    else:

        model = pipeline

        preprocessor = None

    if not hasattr(model, "feature_importances_"):
        return None

    importance = model.feature_importances_

    # -----------------------------
    # Get transformed feature names
    # -----------------------------

    try:

        feature_names = preprocessor.get_feature_names_out()

    except Exception:

        if feature_names is None:

            feature_names = [
                f"Feature {i+1}"
                for i in range(len(importance))
            ]

    # -----------------------------
    # Make lengths match
    # -----------------------------

    if len(feature_names) != len(importance):

        feature_names = [
            f"Feature {i+1}"
            for i in range(len(importance))
        ]

    feature_names = [
        name.replace("num__", "")
            .replace("cat__", "")
        for name in feature_names
    ]

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

    plt.figure(figsize=(10,6))

    plt.bar(
        importance_df["Feature"],
        importance_df["Importance"],
    )

    plt.xticks(
        rotation=45,
        ha="right",
    )

    plt.ylabel("Importance")

    plt.title("Feature Importance")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "feature_importance.png",
    )

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    return path

# ---------------------------------------------------
# Prediction Distribution
# ---------------------------------------------------

def generate_prediction_distribution_chart(
    predictions,
):

    ensure_output_dir()

    counts = (
        pd.Series(predictions)
        .value_counts()
        .sort_index()
    )

    plt.figure(figsize=(10, 6))
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

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )
    plt.close()

    return path


# ---------------------------------------------------
# Correlation Heatmap
# ---------------------------------------------------

def generate_correlation_heatmap(df):

    ensure_output_dir()

    numeric_df = df.select_dtypes(include="number")

    if numeric_df.empty:
        return None

    corr = numeric_df.corr()

    plt.figure(figsize=(8, 6))

    plt.imshow(corr)

    plt.colorbar()

    plt.xticks(
        range(len(corr.columns)),
        corr.columns,
        rotation=90,
    )

    plt.yticks(
        range(len(corr.columns)),
        corr.columns,
    )

    plt.title("Correlation Heatmap")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "correlation_heatmap.png",
    )

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    return path


# ---------------------------------------------------
# Error Distribution
# ---------------------------------------------------

def generate_error_distribution_chart(
    failure_df,
):

    ensure_output_dir()

    counts = failure_df["error"].value_counts()

    labels = [
        "Correct",
        "Incorrect",
    ]

    values = [
        counts.get(False, 0),
        counts.get(True, 0),
    ]

    plt.figure(figsize=(10, 6))

    plt.bar(labels, values)

    plt.ylabel("Samples")

    plt.title("Prediction Accuracy Distribution")

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "error_distribution.png",
    )

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    return path


# ---------------------------------------------------
# Failed Feature Distribution
# ---------------------------------------------------

def generate_failed_feature_distribution(
    failure_df,
):

    ensure_output_dir()

    failed = failure_df[
        failure_df["error"]
    ]

    if len(failed) == 0:
        return None

    numeric_cols = failed.select_dtypes(
        include="number"
    ).columns.tolist()

    numeric_cols = [
        c for c in numeric_cols
        if c not in [
            "correct",
            "error",
        ]
    ]

    if len(numeric_cols) == 0:
        return None

    feature = numeric_cols[0]

    plt.figure(figsize=(10, 6))

    plt.hist(
        failed[feature],
        bins=10,
    )

    plt.xlabel(feature)

    plt.ylabel("Frequency")

    plt.title(
        f"Failed Sample Distribution ({feature})"
    )

    plt.tight_layout()

    path = os.path.join(
        OUTPUT_DIR,
        "failed_feature_distribution.png",
    )

    plt.savefig(
        path,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    return path