import { IChildrenOnlyProps } from "../component";

export const Card = ({ children }: IChildrenOnlyProps) => {
	return (
		<div
			className={
				"card bg-white rounded-2xl w-[816px] p-8 overflow-y-scroll max-h-max h-max shadow-custom"
			}
		>
			{children}
		</div>
	);
};
