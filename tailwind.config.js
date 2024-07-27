/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"radial-gradient":
					"radial-gradient(rgba(98, 88, 104, 1), rgba(41, 34, 45, 1) 100%)",
			},
		},
	},
	plugins: [],
};
