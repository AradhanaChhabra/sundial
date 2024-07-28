import { SkeletonLoader } from "../skeletonLoader";

export const LoadingState = (): JSX.Element => {
	return (
		<div className="kpi-card flex flex-col gap-3 px-4 py-3">
			<SkeletonLoader height={20} className="rounded-lg" />

			<div className="flex flex-col gap-2">
				<SkeletonLoader height={32} rounded block />
				<SkeletonLoader height={24} rounded block />
			</div>
		</div>
	);
};
