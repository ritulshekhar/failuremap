import { Link, useLocation } from "react-router-dom";
import { theme } from "../theme";
function Navbar() {
    const location = useLocation();

    const linkStyle = (
        active: boolean
    ) => ({
        textDecoration: "none",
        color: active ? "#2563eb" : "#444",
        fontWeight: active ? 700 : 500,
        padding: "10px 16px",
        borderRadius: "8px",
        transition: "0.2s",
    });

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                background: theme.surface,
                borderBottom: `1px solid ${theme.border}`,
                boxShadow: theme.shadow,
                padding: "16px 40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <Link
                to="/upload"
                style={{
                    textDecoration: "none",
                    color: theme.text,
                    fontSize: "28px",
                    fontWeight: 700,
                }}
            >
                FailureMap
            </Link>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                }}
            >
                <Link
                    to="/upload"
                    style={linkStyle(
                        location.pathname === "/upload"
                    )}
                >
                    Upload Dataset
                </Link>

                <Link
                    to="/report"
                    style={linkStyle(
                        location.pathname === "/report"
                    )}
                >
                    Report Dashboard
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;