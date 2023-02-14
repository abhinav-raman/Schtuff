const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"light-yellow": "#fde68a",
				dark: "#44403c",
				"light-green": "#bbf7d0",
				"light-blue": "#bae6fd",
				"light-pink": "#ffC3A0",
			},
			fontFamily: {
				Satoshi: ["Satoshi", ...defaultTheme.fontFamily.sans],
				Britney: ["Britney", ...defaultTheme.fontFamily.sans],
			},
			boxShadow: {
				grey: "0 3px 6px 0 rgba(0, 0, 0, 0.2),0 0 4px 0 rgba(0, 0, 0, 0.1)",
				input: "0 0 0 4px rgb(0 0 0 / 10%)",
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
			xs: { max: "479px" },
		},
	},
	plugins: [],
	darkMode: "class",
};
