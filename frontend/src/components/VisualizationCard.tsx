type Props = {
    title: string;
    image: string | null;
};

function VisualizationCard({
    title,
    image,
}: Props) {

    if (!image) {
        return null;
    }

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >

            <h3
                style={{
                    marginBottom: "15px",
                }}
            >
                {title}
            </h3>

            <img
                src={`http://127.0.0.1:8000/${image}`}
                alt={title}
                style={{
                    width: "100%",
                    borderRadius: "8px",
                }}
            />

        </div>

    );

}

export default VisualizationCard;