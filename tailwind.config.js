/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sfmono: ["SF Mono", "sans-serif"],
			},
			animation: {
				slideIn: "slideIn 0.3s ease-out",
				slideOut: "slideOut 0.3s ease-in",
			},
			keyframes: {
				slideIn: {
					from: { opacity: 0, transform: "translateY(-1rem)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				slideOut: {
					from: { opacity: 1, transform: "translateY(0)" },
					to: { opacity: 0, transform: "translateY(-1rem)" },
				},
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
