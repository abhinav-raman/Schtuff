import { createContext, useEffect, useRef, useState } from "react";

type ThemeType = "light" | "dark";

export const THEMES: { [key: string]: ThemeType } = {
	LIGHT: "light",
	DARK: "dark",
};

export const DarkThemeContext = createContext({
	theme: THEMES.LIGHT,
	toggleTheme: () => {},
});

const handleThemeChangeLogic = (theme: ThemeType) => {
	document.body.classList.remove(THEMES.LIGHT, THEMES.DARK);
	document.body.classList.add(theme);
	localStorage.setItem("user-selected-theme", theme);
};

export const DarkThemeContextProvider = ({ children }: any) => {
	const bodyRef = useRef<HTMLBodyElement | null>(null);
	const [theme, setTheme] = useState<ThemeType>(THEMES.DARK);

	useEffect(() => {
		bodyRef.current = document.querySelector("body");
		const localTheme = localStorage.getItem("user-selected-theme") as ThemeType;
		setTheme(localTheme || THEMES.DARK);
		handleThemeChangeLogic(localTheme || THEMES.DARK);
	}, []);

	const toggleThemeHandler = () => {
		setTheme((prevTheme) => {
			if (prevTheme === THEMES.LIGHT) {
				handleThemeChangeLogic(THEMES.DARK);
				return THEMES.DARK;
			}

			handleThemeChangeLogic(THEMES.LIGHT);
			return THEMES.LIGHT;
		});
	};

	return (
		<DarkThemeContext.Provider
			value={{ theme, toggleTheme: toggleThemeHandler }}
		>
			{children}
		</DarkThemeContext.Provider>
	);
};
