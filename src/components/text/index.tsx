import clsx from "clsx";

type TTextTag = "p" | "span";

interface ITextProps {
	as?: TTextTag;
	children: React.ReactNode;
	color?: TTextColors;
	size?: TTextSizes;
	bold?: boolean;
	className?: string;
}

export type TTextSizes = "small" | "medium" | "large";

export type TTextColors = "new-black" | "light-gray" | "white" | "red";

export const COLORS: Record<TTextColors, string> = {
	"new-black": "text-black text-opacity-80",
	"light-gray": "text-black text-opacity-50",
	white: "text-white",
	red: "text-new-red",
};

const SIZES: Record<TTextSizes, string> = {
	small: "text-small",
	medium: "text-medium",
	large: "text-large",
};

export const Text = ({
	as: TextType = "p",
	children,
	className,
	color = "new-black",
	size = "medium",
	bold = false,
	...props
}: ITextProps): JSX.Element => {
	return (
		<TextType
			{...props}
			className={clsx(
				"font-inter",
				COLORS[color],
				bold && "font-semibold",
				"truncate",
				SIZES[size],
				className
			)}
		>
			{children}
		</TextType>
	);
};
