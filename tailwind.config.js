/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"radial-gradient":
					"radial-gradient(rgba(98, 88, 104, 1), rgba(41, 34, 45, 1) 100%)",
			},
			backgroundColor: {
				"red-lighter": "rgba(255, 93, 57, 0.12)",
				"red-light": "rgba(255, 93, 57, 0.3)",
				ocean: "#119F97",
				"dark-ocean": "#0f8a84",
			},
			boxShadow: {
				custom:
					"0px 120px 160px 0px rgba(0, 0, 0, 10%), 0px 40px 48px 0px rgba(0, 0, 0, 8%), 0px 16px 20px 0px rgba(0, 0, 0, 5%), 0px 6px 8px 0px rgba(0, 0, 0, 4%);",
			},
			colors: {
				ocean: "#119F97",
				"new-red": "#FF5D39",
				// #ff441a
				"new-dark-red": "#ff5833",
			},
			fontSize: {
				large: ["28px", "36px"],
			},
		},
	},
	plugins: [],
};
