import { useEffect, useState } from "react";

import {
    getFailureMap,
    getFailureRegions,
    getAIAnalysis,
    getExplainability,
    getVisualizations,
} from "../api/api";

import MetricsCard from "../components/MetricsCard";

const cellStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "left" as const,
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

            <div
                style={{
                    padding: "30px",
                }}
            >

                <h2>
                    Loading dashboard...
                </h2>

            </div>

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

    return (

        <div
            style={{
                padding: "30px",
                fontFamily: "Arial",
            }}
        >

            <h1>
                FailureMap Dashboard
            </h1>

            <hr />

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

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
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

            <h2>
                Explainability
            </h2>

            <pre>

                {JSON.stringify(
                    explainability,
                    null,
                    2
                )}

            </pre>

            <h2>
                Visualizations
            </h2>

            <pre>

                {JSON.stringify(
                    visualizations,
                    null,
                    2
                )}

            </pre>

        </div>

    );

}

export default ReportPage;