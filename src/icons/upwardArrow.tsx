import React from "react";

export function UpwardArrowIcon({
	width,
	height,
	...props
}: React.HTMLProps<SVGSVGElement>): JSX.Element {
	return (
		<svg
			{...props}
			width={width}
			height={height}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.00001 3.33334V12.6667"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M4.666 6.66667L8 3.33267L11.334 6.66667"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
