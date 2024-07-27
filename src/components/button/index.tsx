import React from "react";
import { TTextColors, Text } from "../text";
import clsx from "clsx";

export type TButtonTypes = "submit" | "cancel";

const COLORS: Record<TButtonTypes, string> = {
	submit:
		"bg-ocean hover:bg-dark-ocean active:bg-dark-ocean focus:bg-dark-ocean",
	cancel:
		"group bg-red-lighter hover:bg-red-light active:bg-red-light focus:bg-red-light",
};

const TEXT_COLORS: Record<TButtonTypes, TTextColors> = {
	submit: "white",
	cancel: "red",
};

interface IButtonProps {
	buttonType?: TButtonTypes;
	disabled?: boolean;
	onClick?: (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void;
	children: React.ReactNode;
	className?: string;
}

const Button = ({
	buttonType = "submit",
	disabled = false,
	onClick,
	children,
	className,
	...props
}: IButtonProps): JSX.Element => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={clsx(
				"focus:outline-none flex select-none py-1.5 px-1 items-center font-semibold text-sm whitespace-nowrap rounded-lg border-none w-full",
				disabled && "cursor-not-allowed opacity-30",
				COLORS[buttonType],
				className
			)}
			onClick={onClick}
		>
			<div className="flex h-full w-full items-center justify-center">
				<Text color={TEXT_COLORS[buttonType]}>{children}</Text>
			</div>
		</button>
	);
};

export default Button;
