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
    padding: "16px",
    borderBottom: "1px solid #E5E7EB",
    color: "#374151",
    fontSize: "15px",
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

const buttonStyle = {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(37,99,235,0.2)",
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


                <h2
                    style={{
                        fontSize: "34px",
                        marginBottom: "28px",
                        color: "#111827",
                    }}
                >
                    Executive Summary
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "24px",
                        marginBottom: "60px",
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

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "18px",
                        padding: "28px",
                        border: "1px solid #E5E7EB",
                        boxShadow:
                            "0 8px 24px rgba(0,0,0,0.06)",
                        marginTop: "50px",
                        overflowX: "auto",
                    }}
                >

                    <h2
                        style={{
                            fontSize: "34px",
                            marginBottom: "24px",
                            color: "#111827",
                        }}
                    >
                        Failure Regions
                    </h2>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "15px",
                        }}
                    >
                        <thead>

                            <tr
                                style={{
                                    background: "#f5f5f5",
                                }}
                            >

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                > Feature </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
                                    Condition
                                </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
                                    Samples
                                </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
                                    Errors
                                </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
                                    Failure Rate
                                </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
                                    Severity
                                </th>

                                <th
                                    style={{
                                        background: "#F9FAFB",
                                        padding: "16px",
                                        textAlign: "left",
                                        borderBottom:
                                            "2px solid #E5E7EB",
                                        color: "#374151",
                                        fontWeight: 700,
                                    }}
                                >
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
                                        style={{
                                            background:
                                                index % 2 === 0
                                                    ? "#FFFFFF"
                                                    : "#F9FAFB",
                                        }}
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
                                            <span
                                                style={{
                                                    padding: "6px 14px",
                                                    borderRadius: "999px",
                                                    background:
                                                        region.severity === "High"
                                                            ? "#FEE2E2"
                                                            : region.severity === "Medium"
                                                                ? "#FEF3C7"
                                                                : "#DCFCE7",
                                                    color:
                                                        region.severity === "High"
                                                            ? "#B91C1C"
                                                            : region.severity === "Medium"
                                                                ? "#92400E"
                                                                : "#166534",
                                                    fontWeight: 600,
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {region.severity}
                                            </span>
                                        </td>

                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    padding: "6px 14px",
                                                    borderRadius: "999px",
                                                    background: "#DBEAFE",
                                                    color: "#1D4ED8",
                                                    fontWeight: 600,
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {region.confidence}
                                            </span>
                                        </td>

                                    </tr>

                                )

                            )}

                        </tbody>

                    </table>

                </div>

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "18px",
                        padding: "30px",
                        marginTop: "50px",
                        border: "1px solid #E5E7EB",
                        boxShadow:
                            "0 8px 24px rgba(0,0,0,0.06)",
                    }}
                >

                    <h2
                        style={{
                            fontSize: "34px",
                            marginBottom: "12px",
                            color: "#111827",
                        }}
                    >
                        AI Analysis
                    </h2>

                    <p
                        style={{
                            color: "#6B7280",
                            fontSize: "17px",
                            marginBottom: "36px",
                            lineHeight: "28px",
                        }}
                    >
                        AI-generated observations and recommendations based on the trained machine learning model.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                            marginTop: "28px",
                            marginBottom: "40px",
                        }}
                    >

                        <button
                            onClick={downloadFullReport}
                            style={buttonStyle}
                        >
                            Download Report
                        </button>

                        <button
                            onClick={downloadFailureRegions}
                            style={buttonStyle}
                        >
                            Failure Regions
                        </button>

                        <button
                            onClick={downloadAIAnalysis}
                            style={buttonStyle}
                        >
                            AI Analysis
                        </button>

                        <button
                            onClick={printDashboard}
                            style={buttonStyle}
                        >
                            Print Dashboard
                        </button>

                    </div>
                    <div
                        style={{
                            background: "#F9FAFB",
                            border: "1px solid #E5E7EB",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "35px",
                        }}
                    >

                        <h3
                            style={{
                                marginTop: 0,
                                color: "#111827",
                            }}
                        >
                            Report Information
                        </h3>

                        <p>
                            <strong>Generated:</strong>{" "}
                            {new Date().toLocaleString()}
                        </p>

                        <p>
                            <strong>Task:</strong>{" "}
                            Classification
                        </p>

                        <p>
                            <strong>Model:</strong>{" "}
                            XGBoost
                        </p>

                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(420px,1fr))",
                            gap: "28px",
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

                            <ul
                                style={{
                                    marginTop: "18px",
                                    lineHeight: "34px",
                                    paddingLeft: "24px",
                                }}>
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

                            <ul
                                style={{
                                    marginTop: "18px",
                                    lineHeight: "34px",
                                    paddingLeft: "24px",
                                }}>
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
                </div>
            </div>

            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "30px",
                    marginTop: "50px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
            >

                <h2
                    style={{
                        fontSize: "34px",
                        color: "#111827",
                        marginBottom: "12px",
                    }}
                >
                    Explainability
                </h2>

                <p
                    style={{
                        color: "#6B7280",
                        fontSize: "17px",
                        lineHeight: "28px",
                        marginBottom: "36px",
                    }}
                >
                    Understand how the model makes predictions through feature importance,
                    confusion matrix analysis, and detailed classification metrics.
                </p>
            </div>

            <h3
                style={{
                    fontSize: "28px",
                    color: "#111827",
                    marginBottom: "24px",
                }}
            >
                Classification Report
            </h3>

            <div
                style={{
                    overflowX: "auto",
                    border: "1px solid #E5E7EB",
                    borderRadius: "16px",
                    marginBottom: "40px",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "15px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f5f5f5",
                            }}
                        >

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                Class
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                Precision
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                Recall
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                F1 Score
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
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

                                            <td style={{
                                                padding: "16px",
                                                borderBottom: "1px solid #E5E7EB",
                                                color: "#374151",
                                            }}>
                                                {label}
                                            </td>

                                            <td style={{
                                                padding: "16px",
                                                borderBottom: "1px solid #E5E7EB",
                                                color: "#374151",
                                            }}>
                                                {values.precision.toFixed(2)}
                                            </td>

                                            <td style={{
                                                padding: "16px",
                                                borderBottom: "1px solid #E5E7EB",
                                                color: "#374151",
                                            }}>
                                                {values.recall.toFixed(2)}
                                            </td>

                                            <td style={{
                                                padding: "16px",
                                                borderBottom: "1px solid #E5E7EB",
                                                color: "#374151",
                                            }}>
                                                {values["f1-score"].toFixed(2)}
                                            </td>

                                            <td style={{
                                                padding: "16px",
                                                borderBottom: "1px solid #E5E7EB",
                                                color: "#374151",
                                            }}>
                                                {values.support}
                                            </td>

                                        </tr>

                                    )

                                )

                        }

                    </tbody>

                </table>
            </div>
            <h3
                style={{
                    fontSize: "28px",
                    color: "#111827",
                    marginTop: "50px",
                    marginBottom: "24px",
                }}
            >
                Confusion Matrix
            </h3>

            <div
                style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "40px",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "center",
                        fontSize: "16px",
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
            </div>
            <h3
                style={{
                    fontSize: "28px",
                    color: "#111827",
                    marginTop: "50px",
                    marginBottom: "24px",
                }}
            >
                Feature Importance
            </h3>

            <div
                style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "40px",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "15px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f5f5f5",
                            }}
                        >

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                Feature
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
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

                                    <td style={{
                                        padding: "20px",
                                        borderBottom: "1px solid #E5E7EB",
                                        fontWeight: 700,
                                        color: "#111827",
                                    }}>
                                        {item.feature}
                                    </td>

                                    <td
                                        style={{
                                            padding: "20px",
                                            borderBottom: "1px solid #E5E7EB",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#2563EB",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.importance.toFixed(4)}
                                        </span>
                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>
            </div>
            <h3
                style={{
                    fontSize: "28px",
                    color: "#111827",
                    marginTop: "50px",
                    marginBottom: "24px",
                }}
            >
                SHAP Feature Importance
            </h3>

            <div
                style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "40px",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "15px",
                    }}
                >

                    <thead>

                        <tr>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
                                Feature
                            </th>

                            <th style={{
                                background: "#F9FAFB",
                                padding: "16px",
                                textAlign: "left",
                                borderBottom: "2px solid #E5E7EB",
                                color: "#374151",
                                fontWeight: 700,
                            }}>
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

                                <tr key={index}>

                                    <td
                                        style={{
                                            padding: "20px",
                                            borderBottom: "1px solid #E5E7EB",
                                            fontWeight: 700,
                                            color: "#111827",
                                        }}
                                    >
                                        {item.feature}
                                    </td>

                                    <td
                                        style={{
                                            padding: "20px",
                                            borderBottom: "1px solid #E5E7EB",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#7C3AED",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {item.importance.toFixed(4)}
                                        </span>
                                    </td>

                                </tr>

                            )

                        )}

                    </tbody>

                </table>
            </div>
            <h2
                style={{
                    fontSize: "34px",
                    color: "#111827",
                    marginTop: "50px",
                    marginBottom: "24px",
                }}
            >
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

        </>
    );

}

export default ReportPage;