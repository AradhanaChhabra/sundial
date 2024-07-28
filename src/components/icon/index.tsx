import clsx from "clsx";
import React, { type PropsWithoutRef } from "react";

export type TIconColors = "red" | "green";

export type TIconSizes = "small" | "medium" | "large";

export interface IIconProps
	extends PropsWithoutRef<JSX.IntrinsicElements["svg"]> {
	icon: React.ComponentType<JSX.IntrinsicElements["svg"]>;
	size?: TIconSizes;
	color: TIconColors;
	className?: string;
	onClick?: (event?: any) => void;
}

export const ICON_COLORS: Record<TIconColors, string> = {
	red: "text-red",
	green: "text-green",
};

const SIZES: Record<TIconSizes, number> = {
	small: 16,
	medium: 24,
	large: 32,
};

const Icon = ({
	icon: IconComponent,
	size = "small",
	color,
	className,
	id,
	onClick,
	strokeWidth: customStrokeWidth,
	...props
}: IIconProps): JSX.Element => (
	<IconComponent
		className={clsx(
			className,
			ICON_COLORS[color],
			"flex-shrink-0",
			onClick !== undefined && "cursor-pointer"
		)}
		height={SIZES[size]}
		width={SIZES[size]}
		strokeWidth={customStrokeWidth ?? (size === "small" ? 1.5 : 1)}
		onClick={onClick}
		{...props}
	/>
);

export default Icon;
