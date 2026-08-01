type MetricsCardProps = {
    title: string;
    value: string | number;
};

function MetricsCard({
    title,
    value,
}: MetricsCardProps) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                minWidth: "180px",
                backgroundColor: "#fafafa",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
        >
            <h3
                style={{
                    margin: 0,
                    color: "#666",
                    fontSize: "16px",
                }}
            >
                {title}
            </h3>

            <h1
                style={{
                    marginTop: "12px",
                    marginBottom: 0,
                    fontSize: "34px",
                }}
            >
                {value}
            </h1>
        </div>
    );
}

export default MetricsCard;