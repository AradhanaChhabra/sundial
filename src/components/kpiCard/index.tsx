import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { IEditKPIProps, IKPIData, ISelectedTimeSeriesParams } from "../../App";
import { AddIcon } from "../../icons/addIcon";
import { Icon } from "../icon";
import { ICategorizedOption, IOption } from "../select";
import { ChartView } from "./chartView";
import EditView from "./editView";
import { LoadingState } from "./loadingState";

interface IKPICardProps {
	index: number;
	noOfCards: number;
	editMode: boolean;
	isLoading: boolean;
	timeSeriesData: IKPIData | null;
	segmentOptions: ICategorizedOption[] | null;
	metricsOptions: IOption[] | null;
	onDeleteCard: (index: number) => void;
	onAddEmptyCard: (index: number) => void;
	onEdit: (d: IEditKPIProps) => void;
}

const KPICard = ({
	index,
	timeSeriesData,
	isLoading,
	onEdit,
	segmentOptions,
	metricsOptions,
	editMode,
	onAddEmptyCard,
	noOfCards,
	onDeleteCard,
}: IKPICardProps) => {
	const [isEditState, setIsEditState] = useState(editMode);

	const onCancel = useCallback(() => {
		if (timeSeriesData !== null) {
			setIsEditState(false);
		} else {
			onDeleteCard(index);
		}
	}, [index, onDeleteCard, timeSeriesData]);

	const onEditSubmit = useCallback(
		(props: ISelectedTimeSeriesParams) => {
			onEdit({ ...props, index: index });
			setIsEditState(false);
		},
		[index, onEdit]
	);

	useEffect(() => {
		if (index === 0 && timeSeriesData !== null) {
			setIsEditState(false);
		}
	}, [index, timeSeriesData]);

	if (!isEditState && timeSeriesData === null) {
		return <LoadingState />;
	}

	return (
		<div id={String(index)} className="kpi-card px-6 relative group border-0">
			{/* right side button */}
			<div
				className={clsx(
					"absolute opacity-0 py-10 hover:opacity-100 -right-[11px] top-[calc(50%-10px-2.5rem)] group-hover:opacity-100 transition-all duration-100 ease-in-out z-[999] "
				)}
			>
				<Icon
					icon={AddIcon}
					color="green"
					size="medium"
					onClick={() => {
						onAddEmptyCard(index + 1);
					}}
				/>
			</div>

			{/* left side button */}
			<div
				className={clsx(
					"absolute py-10 opacity-0 group-hover:opacity-100 hover:opacity-100 -left-2.5 top-[calc(50%-10px-2.5rem)] z-[999] transition-all duration-300 ease-in-out"
				)}
			>
				<Icon
					icon={AddIcon}
					color="green"
					size="medium"
					className={clsx()}
					onClick={() => {
						onAddEmptyCard(index);
					}}
				/>
			</div>

			{timeSeriesData !== null && !isEditState ? (
				<ChartView
					noOfCards={noOfCards}
					kpiData={timeSeriesData}
					showEditMode={() => {
						setIsEditState(true);
					}}
				/>
			) : segmentOptions !== null && metricsOptions !== null && isEditState ? (
				<EditView
					noOfCards={noOfCards}
					segmentOptions={segmentOptions}
					metricsOptions={metricsOptions}
					onEdit={onEditSubmit}
					onCancel={onCancel}
					defaultMetric={timeSeriesData?.metric ?? undefined}
					defaultSegment={timeSeriesData?.segment?.option}
				/>
			) : (
				<LoadingState />
			)}
		</div>
	);
};

export default KPICard;
