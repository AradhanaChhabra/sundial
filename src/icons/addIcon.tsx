import React from "react";

export function AddIcon({
	width,
	height,
	...props
}: React.HTMLProps<SVGSVGElement>): JSX.Element {
	return (
		<svg
			{...props}
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="20" height="20" rx="10" fill="#119F97" />
			<path
				d="M6 10L14 10"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M10 6L10 14"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}
