import pandas as pd


def generate_ai_failure_analysis(
    metrics,
    failure_regions,
    feature_importances=None,
):
    """
    Generates rule-based AI insights from model outputs.
    (Later this can be replaced with an OpenAI/Gemini LLM.)
    """

    insights = []

    # -----------------------------------------
    # Model Performance
    # -----------------------------------------

    accuracy = metrics.get("accuracy")

    if accuracy is not None:

        if accuracy >= 0.95:
            insights.append(
                "The model is performing exceptionally well with high overall accuracy."
            )

        elif accuracy >= 0.85:
            insights.append(
                "The model performs well but there is still room for improvement."
            )

        else:
            insights.append(
                "Model accuracy is relatively low. Additional feature engineering or model tuning is recommended."
            )

    # -----------------------------------------
    # Failure Regions
    # -----------------------------------------

    if len(failure_regions) > 0:

        region = failure_regions[0]

        if region["failure_rate"] > 0:

            insights.append(
            f"Highest risk region detected: {region['condition']} "
            f"(Failure Rate: {region['failure_rate']:.2%})"
            )

            insights.append(
            "Collecting more training samples in this region may improve model performance."
        )

    else:

        insights.append(
            "No significant failure regions were detected because the model achieved near-perfect performance on the evaluation dataset."
        )

    # -----------------------------------------
    # Feature Importance
    # -----------------------------------------

    if feature_importances is not None and len(feature_importances) > 0:

        top_feature = feature_importances.iloc[0]["Feature"]

        insights.append(
            f"The most influential feature is '{top_feature}'."
        )

    # -----------------------------------------
    # Recommendations
    # -----------------------------------------

    recommendations = [

        "Investigate incorrectly classified samples.",

        "Check for class imbalance.",

        "Perform feature engineering.",

        "Compare multiple machine learning models.",

        "Tune hyperparameters using GridSearchCV or RandomizedSearchCV."

    ]

    return {

        "insights": insights,

        "recommendations": recommendations

    }