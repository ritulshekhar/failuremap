import { Link, useLocation } from "react-router-dom";

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
                background: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
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
                    color: "#111827",
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