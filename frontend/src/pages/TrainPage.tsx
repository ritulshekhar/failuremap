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

    const [countdown, setCountdown] =
        useState(3);

    const handleTrain = async () => {
        try {
            setLoading(true);

            const response =
                await trainModel();

            setResult(response.data);

            setLoading(false);

            let seconds = 3;

            setCountdown(seconds);

            const interval = setInterval(() => {
                seconds--;

                setCountdown(seconds);

                if (seconds === 0) {
                    clearInterval(interval);
                    navigate("/report");
                }
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
                    {loading && (
                        <div
                            style={{
                                marginTop: "28px",
                                padding: "24px",
                                borderRadius: "14px",
                                background: "#EFF6FF",
                                border: "1px solid #BFDBFE",
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    color: "#1D4ED8",
                                }}
                            >
                                ⏳ Training in Progress
                            </h3>

                            <p
                                style={{
                                    color: "#374151",
                                    marginBottom: 0,
                                }}
                            >
                                FailureMap is currently training an XGBoost model,
                                evaluating predictions, generating failure regions,
                                and preparing the analytics dashboard.
                            </p>
                            <div
                                style={{
                                    marginTop: "20px",
                                    width: "100%",
                                    height: "12px",
                                    background: "#DBEAFE",
                                    borderRadius: "999px",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "#2563EB",
                                        animation: "progressAnimation 2s linear infinite",
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {result && (
                        <div
                            style={{
                                marginTop: "32px",
                                padding: "28px",
                                background: "#ECFDF3",
                                border: "1px solid #BBF7D0",
                                borderRadius: "16px",
                            }}
                        >
                            <h2
                                style={{
                                    marginTop: 0,
                                    color: "#166534",
                                }}
                            >
                                Model Training Complete
                            </h2>

                            <p
                                style={{
                                    color: "#374151",
                                    lineHeight: "28px",
                                }}
                            >
                                Your machine learning model has been trained
                                successfully.

                                <br />
                                <br />

                                FailureMap has generated predictions,
                                evaluated model performance,
                                discovered failure regions,
                                and is preparing your analytics dashboard.
                            </p>

                            <div
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    gap: "14px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "10px 18px",
                                        background: "#DCFCE7",
                                        borderRadius: "999px",
                                        color: "#166534",
                                        fontWeight: 600,
                                    }}
                                >
                                    Model Trained
                                </div>

                                <div
                                    style={{
                                        padding: "10px 18px",
                                        background: "#DBEAFE",
                                        borderRadius: "999px",
                                        color: "#1D4ED8",
                                        fontWeight: 600,
                                    }}
                                >
                                    Failure Regions Generated
                                </div>

                                <div
                                    style={{
                                        padding: "10px 18px",
                                        background: "#FEF3C7",
                                        borderRadius: "999px",
                                        color: "#92400E",
                                        fontWeight: 600,
                                    }}
                                >
                                    Report Ready
                                </div>
                                <div
                                    style={{
                                        marginTop: "28px",
                                        color: "#6B7280",
                                        fontSize: "15px",
                                        fontStyle: "italic",
                                    }}
                                >
                                    Redirecting to Report Dashboard in{" "}
                                    <strong>{countdown}</strong> second
                                    {countdown !== 1 ? "s" : ""}...
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
    @keyframes progressAnimation {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(100%);
      }
    }
  `}
            </style>
        </>
    );
}

export default TrainPage;