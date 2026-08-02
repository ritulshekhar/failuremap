import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import type { ReactNode } from "react";

import {
    lightTheme,
    darkTheme,
} from "./theme";

type ThemeType = typeof lightTheme;

type ThemeContextType = {
    theme: ThemeType;
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(
    null
);

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [isDark, setIsDark] = useState(() => {

        return (
            localStorage.getItem("theme") === "dark"
        );

    });

    useEffect(() => {

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    }, [isDark]);

    const value = useMemo(() => ({

        theme: isDark
            ? darkTheme
            : lightTheme,

        isDark,

        toggleTheme: () =>
            setIsDark((prev) => !prev),

    }), [isDark]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

}

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );

    }

    return context;

}