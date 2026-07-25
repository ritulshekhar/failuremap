import math
import pandas as pd


def get_severity(failure_rate):
    """
    Categorize failure severity based on failure rate.
    """

    if failure_rate >= 50:
        return "Critical"

    if failure_rate >= 25:
        return "High"

    if failure_rate >= 10:
        return "Moderate"

    return "Low"


def get_confidence(samples):
    """
    Estimate confidence based on sample count.
    """

    if samples >= 50:
        return "Very High"

    if samples >= 25:
        return "High"

    if samples >= 10:
        return "Medium"

    return "Low"


def discover_failure_regions(
    failure_df: pd.DataFrame,
    min_samples: int = 3,
):
    """
    Discovers failure regions using simple median splits.
    Each region receives:
    - failure rate
    - severity
    - confidence
    - risk score
    """

    failure_regions = []

    numeric_columns = failure_df.select_dtypes(
        include=["number"]
    ).columns.tolist()

    numeric_columns = [
        col
        for col in numeric_columns
        if col not in ["correct", "error"]
    ]

    for feature in numeric_columns:

        median = failure_df[feature].median()

        conditions = [

            (
                f"{feature} <= {round(median,3)}",
                failure_df[feature] <= median,
            ),

            (
                f"{feature} > {round(median,3)}",
                failure_df[feature] > median,
            ),

        ]

        for condition_name, mask in conditions:

            subset = failure_df[mask]

            samples = len(subset)

            if samples < min_samples:
                continue

            errors = int(
                subset["error"].sum()
            )

            failure_rate = (
                errors / samples
            ) * 100

            severity = get_severity(
                failure_rate
            )

            confidence = get_confidence(
                samples
            )

            risk_score = round(
                failure_rate *
                math.log(samples + 1),
                2,
            )

            failure_regions.append(

                {

                    "feature": feature,

                    "condition": condition_name,

                    "samples": samples,

                    "errors": errors,

                    "failure_rate": round(
                        failure_rate,
                        2,
                    ),

                    "severity": severity,

                    "confidence": confidence,

                    "risk_score": risk_score,

                }

            )

    failure_regions = sorted(

        failure_regions,

        key=lambda x: x["risk_score"],

        reverse=True,

    )

    return failure_regions