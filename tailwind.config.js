const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    	extend: {
    		colors: {
    			'light-yellow': '#fde68a',
    			dark: '#44403c',
    			'light-green': '#bbf7d0',
    			'light-blue': '#bae6fd',
    			'light-pink': '#ffC3A0',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			Satoshi: ["Satoshi", ...defaultTheme.fontFamily.sans],
    			Britney: ["Britney", ...defaultTheme.fontFamily.sans]
    		},
    		boxShadow: {
    			grey: '0 3px 6px 0 rgba(0, 0, 0, 0.2),0 0 4px 0 rgba(0, 0, 0, 0.1)',
    			input: '0 0 0 4px rgb(0 0 0 / 10%)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	},
    	screens: {
    		'2xl': {
    			max: '1535px'
    		},
    		xl: {
    			max: '1279px'
    		},
    		lg: {
    			max: '1023px'
    		},
    		md: {
    			max: '767px'
    		},
    		sm: {
    			max: '639px'
    		},
    		xs: {
    			max: '479px'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
	darkMode: ["class", "class"],
};
