import os
import matplotlib.pyplot as plt


OUTPUT_DIR = "outputs"


def generate_failure_region_chart(failure_regions):

    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

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

    chart_path = os.path.join(
        OUTPUT_DIR,
        "failure_regions.png",
    )

    plt.savefig(chart_path)

    plt.close()

    return chart_path