import { createContext, useEffect, useRef, useState } from "react";

export type ThemeType =
	| "light-yellow"
	| "light-green"
	| "light-blue"
	| "light-pink";

export const THEMES: { [key: string]: ThemeType } = {
	LIGHT_YELLOW: "light-yellow",
	LIGHT_GREEN: "light-green",
	LIGHT_BLUE: "light-blue",
	LIGHT_PINK: "light-pink",
};

export const ThemeColors: { [key in ThemeType]: string } = {
	"light-yellow": "#fde68a",
	"light-green": "#bbf7d0",
	"light-blue": "#bae6fd",
	"light-pink": "#FFC3A0",
};

export const ThemeContext = createContext({
	theme: THEMES.LIGHT_YELLOW,
	changeTheme: (theme: ThemeType) => {},
});

function handleThemeLogic(theme: ThemeType) {
	document.body.classList.remove(...Object.values(THEMES));
	document.body.classList.add(theme);
	localStorage.setItem("user-selected-color-theme", theme);
}

export function ThemeContextProvider({ children }: any) {
	const bodyRef = useRef<HTMLBodyElement | null>(null);
	const [theme, setTheme] = useState<ThemeType>(THEMES.DARK);

	useEffect(() => {
		bodyRef.current = document.querySelector("body");
		const localTheme = localStorage.getItem(
			"user-selected-color-theme"
		) as ThemeType;
		chnageThemeHandler(localTheme || THEMES.LIGHT_YELLOW);
	}, []);

	function chnageThemeHandler(clickedTheme: ThemeType) {
		handleThemeLogic(clickedTheme);
		setTheme(clickedTheme);
	}

	return (
		<ThemeContext.Provider value={{ theme, changeTheme: chnageThemeHandler }}>
			{children}
		</ThemeContext.Provider>
	);
}
