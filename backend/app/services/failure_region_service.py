import pandas as pd


def discover_failure_regions(
    failure_df: pd.DataFrame,
    min_samples: int = 3,
):
    """
    Discovers simple failure regions by checking whether
    values above or below the median produce high error rates.
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
                f"{feature} <= {round(median, 3)}",
                failure_df[feature] <= median,
            ),
            (
                f"{feature} > {round(median, 3)}",
                failure_df[feature] > median,
            ),
        ]

        for condition_name, mask in conditions:

            subset = failure_df[mask]

            if len(subset) < min_samples:
                continue

            errors = int(subset["error"].sum())

            failure_rate = (
                errors / len(subset)
            ) * 100

            failure_regions.append(
                {
                    "feature": feature,
                    "condition": condition_name,
                    "samples": len(subset),
                    "errors": errors,
                    "failure_rate": round(
                        failure_rate,
                        2,
                    ),
                }
            )

    failure_regions = sorted(
        failure_regions,
        key=lambda x: (
            x["failure_rate"],
            x["errors"],
        ),
        reverse=True,
    )

    return failure_regions