type Props = {
    visible: boolean;
    message?: string;
};

function LoadingOverlay({
    visible,
    message = "Loading...",
}: Props) {

    if (!visible) {
        return null;
    }

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(255,255,255,0.75)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                backdropFilter: "blur(4px)",
            }}
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >

                <div
                    style={{
                        width: "52px",
                        height: "52px",
                        border: "5px solid #E5E7EB",
                        borderTop: "5px solid #2563EB",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />

                <p
                    style={{
                        fontWeight: 600,
                        color: "#374151",
                    }}
                >
                    {message}
                </p>

            </div>

            <style>
                {`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                `}
            </style>

        </div>

    );

}

export default LoadingOverlay;