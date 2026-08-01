import { useEffect, useState } from "react";

import {
    getFailureMap,
    getFailureRegions,
    getAIAnalysis,
    getExplainability,
    getVisualizations,
} from "../api/api";

import MetricsCard from "../components/MetricsCard";

import VisualizationCard from "../components/VisualizationCard";

import Navbar from "../components/Navbar";

const tableContainerStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden" as const,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    marginTop: "20px",
    marginBottom: "40px",
};

const cellStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left" as const,
};

const headerCellStyle = {
    ...cellStyle,
    background: "#f9fafb",
    color: "#111827",
    fontWeight: 700,
    padding: "16px",
};

const bodyCellStyle = {
    cellStyle,
    padding: "16px",
    color: "#374151",
};

function ReportPage() {

    const [failureMap, setFailureMap] =
        useState<any>(null);

    const [failureRegions, setFailureRegions] =
        useState<any>(null);

    const [aiAnalysis, setAIAnalysis] =
        useState<any>(null);

    const [explainability, setExplainability] =
        useState<any>(null);

    const [visualizations, setVisualizations] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const [
                    fm,
                    fr,
                    ai,
                    exp,
                    vis,
                ] = await Promise.all([

                    getFailureMap(),
                    getFailureRegions(),
                    getAIAnalysis(),
                    getExplainability(),
                    getVisualizations(),

                ]);

                setFailureMap(
                    fm.data
                );

                setFailureRegions(
                    fr.data
                );

                setAIAnalysis(
                    ai.data
                );

                setExplainability(
                    exp.data
                );

                setVisualizations(
                    vis.data
                );

            }

            catch (error) {

                console.error(
                    error
                );

            }

            finally {

                setLoading(
                    false
                );

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <>
                <Navbar />
                <div
                    style={{
                        padding: "30px",
                    }}
                >

                    <h2>
                        Loading dashboard...
                    </h2>

                </div>
            </>
        );

    }

    if (!failureMap) {

        return (

            <div
                style={{
                    padding: "30px",
                }}
            >

                <h2>
                    No report available.
                </h2>

            </div>

        );

    }

    const summary =
        failureMap.summary;

    function downloadJSON(
        data: any,
        filename: string
    ) {

        const json =
            JSON.stringify(
                data,
                null,
                2
            );

        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json",
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            filename;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(
            url
        );

    }

    function downloadFullReport() {

        downloadJSON(
            {
                summary:
                    failureMap.summary,

                failure_regions:
                    failureRegions,

                ai_analysis:
                    aiAnalysis,

                explainability:
                    explainability,

                visualizations:
                    visualizations,
            },

            "FailureMap_Report.json"
        );

    }

    function downloadFailureRegions() {

        downloadJSON(
            failureRegions,
            "Failure_Regions.json"
        );

    }

    function downloadAIAnalysis() {

        downloadJSON(
            aiAnalysis,
            "AI_Analysis.json"
        );

    }

    function printDashboard() {

        window.print();

    }

    return (

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "40px auto",
                    padding: "0 24px",
                    fontFamily: "Arial",
                }}
            >

                <div
                    style={{
                        marginBottom: "45px",
                    }}
                >

                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "12px",
                            color: "#111827",
                        }}
                    >
                        Analytics Dashboard
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#6B7280",
                            maxWidth: "760px",
                            lineHeight: "30px",
                        }}
                    >
                        Explore model performance,
                        discover failure regions,
                        understand feature importance,
                        inspect explainability,
                        and review AI-generated insights
                        for your trained machine learning model.
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "45px",
                        flexWrap: "wrap",
                        alignItems: "center",
                        background: "#ffffff",
                        padding: "22px",
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    }}
                >

                    <button
                        onClick={downloadFullReport}
                        style={{
                            padding: "12px 22px",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "15px",
                        }}
                    >
                        Download Full Report
                    </button>

                    <button
                        onClick={downloadFailureRegions}
                        style={{
                            padding: "12px 22px",
                            background: "#16a34a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "15px",
                        }}
                    >
                        Download Failure Regions
                    </button>

                    <button
                        onClick={downloadAIAnalysis}
                        style={{
                            padding: "12px 22px",
                            background: "#7c3aed",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "15px",
                        }}
                    >
                        Download AI Analysis
                    </button>

                    <button
                        onClick={
                            printDashboard
                        }
                        style={{
                            padding: "12px 22px",
                            background: "#ea580c",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "15px",
                        }}
                    >
                        Print / Save PDF
                    </button>

                </div>


                <h2>
                    Overview
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "40px",
                    }}
                >

                    <MetricsCard
                        title="Accuracy"
                        value={`${(
                            summary.accuracy * 100
                        ).toFixed(2)}%`}
                    />

                    <MetricsCard
                        title="Total Samples"
                        value={summary.total_samples}
                    />

                    <MetricsCard
                        title="Correct"
                        value={summary.correct_predictions}
                    />

                    <MetricsCard
                        title="Incorrect"
                        value={summary.incorrect_predictions}
                    />

                </div>

                <h2>
                    Failure Regions
                </h2>
                <div style={tableContainerStyle}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    background: "#f5f5f5",
                                }}
                            >

                                <th style={cellStyle}>
                                    Feature
                                </th>

                                <th style={cellStyle}>
                                    Condition
                                </th>

                                <th style={cellStyle}>
                                    Samples
                                </th>

                                <th style={cellStyle}>
                                    Errors
                                </th>

                                <th style={cellStyle}>
                                    Failure Rate
                                </th>

                                <th style={cellStyle}>
                                    Severity
                                </th>

                                <th style={cellStyle}>
                                    Confidence
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {failureRegions?.regions?.map(

                                (
                                    region: any,
                                    index: number
                                ) => (

                                    <tr
                                        key={index}
                                    >

                                        <td style={cellStyle}>
                                            {region.feature}
                                        </td>

                                        <td style={cellStyle}>
                                            {region.condition}
                                        </td>

                                        <td style={cellStyle}>
                                            {region.samples}
                                        </td>

                                        <td style={cellStyle}>
                                            {region.errors}
                                        </td>

                                        <td style={cellStyle}>
                                            {(region.failure_rate * 100).toFixed(2)}%
                                        </td>

                                        <td style={cellStyle}>
                                            {region.severity}
                                        </td>

                                        <td style={cellStyle}>
                                            {region.confidence}
                                        </td>

                                    </tr>

                                )

                            )}

                        </tbody>

                    </table>
                </div>

                <h2
                    style={{
                        marginTop: "40px",
                    }}
                >
                    AI Analysis
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "25px",
                        marginBottom: "40px",
                    }}
                >

                    <div
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "20px",
                            background: "#fafafa",
                        }}
                    >

                        <h3>
                            Insights
                        </h3>

                        <ul>

                            {aiAnalysis?.insights?.map(

                                (
                                    item: string,
                                    index: number
                                ) => (

                                    <li
                                        key={index}
                                        style={{
                                            marginBottom: "12px",
                                        }}
                                    >

                                        {item}

                                    </li>

                                )

                            )}

                        </ul>

                    </div>

                    <div
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "20px",
                            background: "#fafafa",
                        }}
                    >

                        <h3>
                            Recommendations
                        </h3>

                        <ul>

                            {aiAnalysis?.recommendations?.map(

                                (
                                    item: string,
                                    index: number
                                ) => (

                                    <li
                                        key={index}
                                        style={{
                                            marginBottom: "12px",
                                        }}
                                    >

                                        {item}

                                    </li>

                                )

                            )}

                        </ul>

                    </div>

                </div>

                <h2
                    style={{
                        marginTop: "40px",
                    }}
                >
                    Explainability
                </h2>

                <h3>
                    Classification Report
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "40px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f5f5f5",
                            }}
                        >

                            <th style={headerCellStyle}>
                                Class
                            </th>

                            <th style={headerCellStyle}>
                                Precision
                            </th>

                            <th style={headerCellStyle}>
                                Recall
                            </th>

                            <th style={headerCellStyle}>
                                F1 Score
                            </th>

                            <th style={headerCellStyle}>
                                Support
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            Object.entries(

                                explainability
                                    ?.report
                                    ?.classification_report || {}

                            )

                                .filter(

                                    ([key]) =>

                                        key !== "accuracy" &&
                                        key !== "macro avg" &&
                                        key !== "weighted avg"

                                )

                                .map(

                                    ([

                                        label,

                                        values,

                                    ]: any) => (

                                        <tr
                                            key={label}
                                        >

                                            <td style={bodyCellStyle}>
                                                {label}
                                            </td>

                                            <td style={bodyCellStyle}>
                                                {values.precision.toFixed(2)}
                                            </td>

                                            <td style={bodyCellStyle}>
                                                {values.recall.toFixed(2)}
                                            </td>

                                            <td style={bodyCellStyle}>
                                                {values["f1-score"].toFixed(2)}
                                            </td>

                                            <td style={bodyCellStyle}>
                                                {values.support}
                                            </td>

                                        </tr>

                                    )

                                )

                        }

                    </tbody>

                </table>

                <h3>
                    Confusion Matrix
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "40px",
                    }}
                >

                    <tbody>

                        {

                            explainability?.report?.confusion_matrix?.map(

                                (
                                    row: number[],
                                    rowIndex: number
                                ) => (

                                    <tr
                                        key={rowIndex}
                                    >

                                        {

                                            row.map(

                                                (
                                                    value: number,
                                                    columnIndex: number
                                                ) => (

                                                    <td
                                                        key={columnIndex}
                                                        style={{
                                                            ...cellStyle,
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                        }}
                                                    >

                                                        {value}

                                                    </td>

                                                )

                                            )

                                        }

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

                <h3>
                    Feature Importance
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "40px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f5f5f5",
                            }}
                        >

                            <th style={cellStyle}>
                                Feature
                            </th>

                            <th style={cellStyle}>
                                Importance
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {explainability?.feature_importance?.map(

                            (
                                item: any,
                                index: number
                            ) => (

                                <tr
                                    key={index}
                                >

                                    <td style={cellStyle}>
                                        {item.feature}
                                    </td>

                                    <td style={cellStyle}>
                                        {item.importance.toFixed(4)}
                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>

                <h3>
                    SHAP Feature Importance
                </h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "40px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f5f5f5",
                            }}
                        >

                            <th style={cellStyle}>
                                Feature
                            </th>

                            <th style={cellStyle}>
                                SHAP Importance
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {explainability?.shap_summary?.map(

                            (
                                item: any,
                                index: number
                            ) => (

                                <tr
                                    key={index}
                                >

                                    <td style={cellStyle}>
                                        {item.feature}
                                    </td>

                                    <td style={cellStyle}>
                                        {item.importance.toFixed(4)}
                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>

                <h2>
                    Visualizations
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(450px, 1fr))",
                        gap: "25px",
                        marginTop: "20px",
                        marginBottom: "40px",
                    }}
                >

                    <VisualizationCard
                        title="Failure Regions"
                        image={
                            visualizations.failure_region_chart
                        }
                    />

                    <VisualizationCard
                        title="Feature Importance"
                        image={
                            visualizations.feature_importance_chart
                        }
                    />

                    <VisualizationCard
                        title="Prediction Distribution"
                        image={
                            visualizations.prediction_distribution_chart
                        }
                    />

                    <VisualizationCard
                        title="Correlation Heatmap"
                        image={
                            visualizations.correlation_heatmap
                        }
                    />

                    <VisualizationCard
                        title="Error Distribution"
                        image={
                            visualizations.error_distribution_chart
                        }
                    />

                    <VisualizationCard
                        title="Failed Feature Distribution"
                        image={
                            visualizations.failed_feature_distribution
                        }
                    />

                </div>

            </div>
        </>
    );

}

export default ReportPage;