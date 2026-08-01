import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    trainModel,
} from "../api/api";

function TrainPage() {

    const navigate =
        useNavigate();

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    const handleTrain =
        async () => {

            try {

                setLoading(
                    true
                );

                const response =
                    await trainModel();

                setResult(
                    response.data
                );

                setLoading(
                    false
                );

                setTimeout(() => {

                    navigate(
                        "/report"
                    );

                }, 1000);

            }

            catch (error) {

                console.error(
                    error
                );

                setLoading(
                    false
                );

            }

        };

    return (

        <div
            style={{
                padding: "20px",
            }}
        >

            <h1>
                Train Model
            </h1>

            <button
                onClick={
                    handleTrain
                }
                disabled={
                    loading
                }
            >

                {

                    loading
                        ? "Training..."
                        : "Train Model"

                }

            </button>

            {

                result && (

                    <div>

                        <h2>
                            Training Complete
                        </h2>

                        <pre>

                            {

                                JSON.stringify(
                                    result,
                                    null,
                                    2
                                )

                            }

                        </pre>

                    </div>

                )}

        </div>

    );

}

export default TrainPage;