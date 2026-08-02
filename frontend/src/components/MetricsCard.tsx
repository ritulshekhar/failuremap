type Props = {
    title: string;
    value: string | number;
};

function MetricsCard({
    title,
    value,
}: Props) {

    const getIcon = () => {

        switch (title) {

            case "Accuracy":
                return "🎯";

            case "Total Samples":
                return "📊";

            case "Correct":
                return "✅";

            case "Incorrect":
                return "❌";

            default:
                return "📈";

        }

    };

    return (

        <div
            style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "24px",
                border: "1px solid #E5E7EB",
                boxShadow:
                    "0 10px 25px rgba(0,0,0,0.06)",
                minWidth: "220px",
                flex: 1,
                transition: "0.25s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(0,0,0,0.12)";
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
            }}
        >

            <div
                style={{
                    fontSize: "32px",
                    marginBottom: "18px",
                }}
            >
                {getIcon()}
            </div>

            <div
                style={{
                    color: "#6B7280",
                    fontSize: "15px",
                    marginBottom: "8px",
                    fontWeight: 600,
                }}
            >
                {title}
            </div>

            <div
                style={{
                    fontSize: "42px",
                    fontWeight: 700,
                    color: "#111827",
                }}
            >
                {value}
            </div>

        </div>

    );

}

export default MetricsCard;