import clsx from "clsx";

interface ISkeletonLoaderProps {
	animate?: boolean;
	block?: boolean;
	className?: string;
	height?: number | string;
	rounded?: boolean;
	width?: number | string;
}

export const SkeletonLoader = ({
	block = false,
	className,
	height = 8,
	rounded = false,
	width = 80,
	...props
}: ISkeletonLoaderProps): JSX.Element => (
	<span
		{...props}
		className={clsx([
			"inline-block bg-neutral-200 animate-pulse",
			rounded && "rounded-lg",
			block && "w-full",
			className,
		])}
		style={
			block
				? { height }
				: {
						width,
						height,
				  }
		}
	/>
);
