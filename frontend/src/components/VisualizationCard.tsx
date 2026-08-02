type Props = {
    title: string;
    image: string | null;
};

function VisualizationCard({
    title,
    image,
}: Props) {

    if (!image) {

        return (

            <div
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow:
                        "0 8px 24px rgba(0,0,0,0.08)",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >

                <div
                    style={{
                        fontSize: "56px",
                        marginBottom: "18px",
                    }}
                >
                    📈
                </div>

                <h3
                    style={{
                        color: "#111827",
                        marginBottom: "12px",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        color: "#6B7280",
                        lineHeight: "26px",
                        maxWidth: "280px",
                    }}
                >
                    This visualization is unavailable because
                    there isn't enough data to generate it.
                </p>

            </div>

        );

    }

    return (

        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "18px",
                padding: "22px",
                boxShadow:
                    "0 8px 24px rgba(0,0,0,0.08)",
                transition: "0.3s ease",
            }}
        >

            <h3
                style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "18px",
                }}
            >
                {title}
            </h3>

            <img
                src={`http://127.0.0.1:8000/${image}`}
                alt={title}
                style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                }}
            />

        </div>

    );

}

export default VisualizationCard;