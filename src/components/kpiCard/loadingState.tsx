import { SkeletonLoader } from "../skeletonLoader";

export const LoadingState = (): JSX.Element => {
	return (
		<div className="kpi-card flex flex-col gap-3 px-4 py-3">
			<SkeletonLoader height={20} className="rounded-lg w-1/2" />

			<div className="flex flex-row justify-between gap-2 items-end">
				<SkeletonLoader height={64} rounded block />
				<SkeletonLoader height={64} rounded block />
			</div>
		</div>
	);
};
