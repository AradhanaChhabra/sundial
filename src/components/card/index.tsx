import clsx from "clsx";
import { IChildrenOnlyProps } from "../component";

interface ICardProps extends IChildrenOnlyProps {
	className?: string;
}

export const Card = ({ children, className, ...props }: ICardProps) => {
	return (
		<div
			className={clsx(
				"card bg-white rounded-2xl w-[816px] py-8 px-4 overflow-y-scroll max-h-max h-max shadow-custom",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};
