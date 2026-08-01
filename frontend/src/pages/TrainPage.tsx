import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    trainModel,
} from "../api/api";

function TrainPage() {
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    const handleTrain = async () => {
        try {
            setLoading(true);

            const response =
                await trainModel();

            setResult(response.data);

            setLoading(false);

            setTimeout(() => {
                navigate("/report");
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "40px auto",
                    padding: "0 24px",
                    fontFamily: "Arial",
                }}
            >
                <div
                    style={{
                        marginBottom: "40px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "12px",
                            color: "#111827",
                        }}
                    >
                        Train Model
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#6B7280",
                            maxWidth: "720px",
                            lineHeight: "30px",
                        }}
                    >
                        Configure and train a machine learning model
                        using the selected dataset. FailureMap will
                        automatically build the model, evaluate its
                        performance, and discover failure regions.
                    </p>
                </div>

                <div
                    style={{
                        background: "#ffffff",
                        padding: "40px",
                        borderRadius: "16px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        border: "1px solid #e5e7eb",
                    }}
                >
                    <h2
                        style={{
                            marginTop: 0,
                            color: "#111827",
                        }}
                    >
                        🚀 Model Training
                    </h2>

                    <p
                        style={{
                            color: "#6B7280",
                            marginBottom: "24px",
                        }}
                    >
                        Train an XGBoost model using the uploaded
                        dataset. Once training is complete,
                        FailureMap will automatically generate
                        predictions, evaluate performance, discover
                        failure regions, and prepare the analytics
                        dashboard.
                    </p>

                    <button
                        onClick={handleTrain}
                        disabled={loading}
                        style={{
                            background: loading
                                ? "#9CA3AF"
                                : "#2563EB",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "10px",
                            padding: "14px 30px",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                            boxShadow:
                                "0 4px 12px rgba(37,99,235,0.25)",
                        }}
                    >
                        {loading
                            ? "⏳ Training Model..."
                            : "🚀 Train Model"}
                    </button>

                    {result && (
                        <div
                            style={{
                                marginTop: "32px",
                                padding: "24px",
                                borderRadius: "14px",
                                background: "#ECFDF3",
                                border: "1px solid #BBF7D0",
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    color: "#166534",
                                }}
                            >
                                ✅ Training Complete
                            </h3>

                            <pre
                                style={{
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    marginBottom: 0,
                                    fontSize: "14px",
                                    color: "#374151",
                                }}
                            >
                                {JSON.stringify(
                                    result,
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default TrainPage;