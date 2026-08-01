import { useEffect, useState } from "react";

import {

    getFailureMap,

    getFailureRegions,

    getVisualizations,

    getAIAnalysis,

    getExplainability,

} from "../api/api";

function ReportPage() {

    const [failureMap, setFailureMap] =
        useState<any>(null);

    const [failureRegions, setFailureRegions] =
        useState<any>(null);

    const [visualizations, setVisualizations] =
        useState<any>(null);

    const [aiAnalysis, setAIAnalysis] =
        useState<any>(null);

    const [explanation, setExplanation] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const [

                    map,

                    regions,

                    visuals,

                    ai,

                    explain,

                ] = await Promise.all([

                    getFailureMap(),

                    getFailureRegions(),

                    getVisualizations(),

                    getAIAnalysis(),

                    getExplainability(),

                ]);

                setFailureMap(
                    map.data
                );

                setFailureRegions(
                    regions.data
                );

                setVisualizations(
                    visuals.data
                );

                setAIAnalysis(
                    ai.data
                );

                setExplanation(
                    explain.data
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
                    padding: "20px",
                }}
            >

                <h2>
                    Loading Report...
                </h2>

            </div>

        );

    }

    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <h1>
                FailureMap Dashboard
            </h1>

            <hr />

            <h2>
                Failure Summary
            </h2>

            <pre>

                {

                    JSON.stringify(
                        failureMap,
                        null,
                        2
                    )

                }

            </pre>

            <hr />

            <h2>
                Failure Regions
            </h2>

            <pre>

                {

                    JSON.stringify(
                        failureRegions,
                        null,
                        2
                    )

                }

            </pre>

            <hr />

            <h2>
                AI Analysis
            </h2>

            <pre>

                {

                    JSON.stringify(
                        aiAnalysis,
                        null,
                        2
                    )

                }

            </pre>

            <hr />

            <h2>
                Explainability
            </h2>

            <pre>

                {

                    JSON.stringify(
                        explanation,
                        null,
                        2
                    )

                }

            </pre>

            <hr />

            <h2>
                Visualizations
            </h2>

            <pre>

                {

                    JSON.stringify(
                        visualizations,
                        null,
                        2
                    )

                }

            </pre>

        </div>

    );

}

export default ReportPage;