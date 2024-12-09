/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sfmono: ["SF Mono", "sans-serif"],
			},
			animation: {
				slideIn: "slideIn 0.3s forwards",
				slideOut: "slideOut 0.3s forwards",
				borderIn: "borderIn 0.3s forwards",
				borderOut: "borderOut 0.3s forwards",
			},
			keyframes: {
				slideIn: {
					from: { opacity: 0, transform: "translateY(1rem)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				slideOut: {
					from: { opacity: 1, transform: "translateY(0)" },
					to: { opacity: 0, transform: "translateX(1rem)" },
				},
				borderIn: {
					from: { borderRadius: "20px" },
					to: { borderRadius: "10px" }
				},
				borderOut: {
					from: { borderRadius: "10px" },
					to: { borderRadius: "20px" }
				}
			},
		},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
