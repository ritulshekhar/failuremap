import { useTheme } from "../ThemeContext";

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
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    background: theme.surface,
                    boxShadow: theme.shadow,
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        theme.shadow;
                }}
            >

                <div
                    style={{
                        fontSize: "56px",
                        marginBottom: "18px",
                    }}
                >

                </div>

                <h3
                    style={{
                        color: theme.text,
                        marginBottom: "12px",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        color: theme.secondaryText,
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
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: "18px",
                padding: "22px",
                boxShadow:
                    theme.shadow,
                transition: "all 0.25s ease",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                    "translateY(-8px)";

                e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.15)";

            }}
            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.boxShadow =
                    theme.shadow;

            }}
        >

            <h3
                style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: theme.text,
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
                    border: `1px solid ${theme.border}`,
                }}
            />

        </div>

    );

}

export default VisualizationCard;