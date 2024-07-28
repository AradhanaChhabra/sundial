import { useCallback, useState } from "react";
import { IEditKPIDataProps } from "../../App";
import { ITimeSeriesData } from "../../context/useTimeSeriesData";
import { Text } from "./../text";
import Button from "../button";
import {
	CustomSelect,
	ICategorizedOption,
	IOption,
	ISelectedCategorizedOption,
	TOption,
} from "../select";
import { SkeletonLoader } from "../skeletonLoader";
import Icon from "../icon";
import { UpwardArrowIcon } from "../../icons/upwardArrow";
import ChartComponent from "../chart";

interface IKPICardProps {
	index: number;
	timeSeriesData: ITimeSeriesData | null;
	segmentOptions: ICategorizedOption[] | null;
	metricsOptions: IOption[] | null;
	onEdit: (d: IEditKPIDataProps) => void;
}

interface ICardEditStateProps {
	index: number;
	segmentOptions: ICategorizedOption[];
	metricsOptions: IOption[];
	onEdit: (d: IEditKPIDataProps) => void;
	onCancel: () => void;
}

const CardEditState = ({
	index,
	segmentOptions,
	metricsOptions,
	onEdit,
	onCancel,
}: ICardEditStateProps) => {
	const [selectedMetric, setSelectedMetric] = useState<IOption | null>(null);

	const [selectedSegmentOption, setSelectedSegmentOption] =
		useState<ISelectedCategorizedOption | null>(null);

	const onMetricSelectChange = useCallback((option: TOption | null) => {
		setSelectedMetric(option as IOption);
	}, []);

	const onSegmentSelectChange = useCallback((option: TOption | null) => {
		setSelectedSegmentOption(option as ISelectedCategorizedOption);
	}, []);

	const onEditKPI = useCallback(() => {
		if (selectedMetric === null || selectedSegmentOption === null) {
			return;
		}

		onEdit({
			metric: selectedMetric.value,
			segmentKey: selectedSegmentOption.segmentKey,
			segmentId: selectedSegmentOption.value,
		});
	}, [onEdit, selectedMetric, selectedSegmentOption]);

	return (
		<div className="flex flex-col gap-3">
			<CustomSelect
				placeholder="Select a metric"
				options={metricsOptions}
				onChange={onMetricSelectChange}
			/>

			<CustomSelect
				placeholder="Select a segment"
				options={segmentOptions}
				onChange={onSegmentSelectChange}
			/>

			<div className="flex flex-row justify-between gap-3">
				<Button buttonType="cancel" onClick={onCancel}>
					Cancel
				</Button>
				<Button buttonType="submit" onClick={onEditKPI}>
					Add
				</Button>
			</div>
		</div>
	);
};

const DataOnCharts = ({
	showEditMode,
	timeSeriesData,
}: {
	showEditMode: () => void;
	timeSeriesData: ITimeSeriesData;
}) => {
	return (
		<div onClick={showEditMode} className="relative flex flex-row">
			<div className="flex flex-col gap-2">
				<Text size="small" bold>
					{timeSeriesData.metric}
				</Text>

				<Text className="mt-2" size="large" bold>
					evfrevrv
				</Text>

				<div className="flex flex-row gap-0.5 items-center">
					<Icon icon={UpwardArrowIcon} color="red" size="small" />
					<Text as="span" size="small">
						sfcef
					</Text>

					<Text as="span" size="small" color="light-gray">
						Δ7d
					</Text>
				</div>
			</div>

			<div className="absolute right-0 top-[-16px] h-[134px]">
				<ChartComponent data={timeSeriesData.values} />
			</div>
		</div>
	);
};

const LoadingState = (): JSX.Element => {
	return (
		<div className="flex flex-col gap-3">
			<SkeletonLoader height={32} width={120} className="rounded-lg" />

			<div className="flex flex-col gap-2">
				<SkeletonLoader height={40} rounded block />
				<SkeletonLoader height={32} rounded block />
			</div>
		</div>
	);
};

const KPICard = ({
	index,
	timeSeriesData,
	onEdit,
	segmentOptions,
	metricsOptions,
}: IKPICardProps) => {
	const [isEditState, setIsEditState] = useState(timeSeriesData === null);

	const onCancel = useCallback(() => {
		setIsEditState(false);
	}, []);

	const onEditSubmit = useCallback(
		({ metric, segmentId, segmentKey }: IEditKPIDataProps) => {
			onEdit({ metric, segmentId, segmentKey });
			setIsEditState(false);
		},
		[onEdit]
	);

	return (
		<div id={String(index)}>
			{timeSeriesData !== null && !isEditState ? (
				<DataOnCharts
					timeSeriesData={timeSeriesData}
					showEditMode={() => {
						setIsEditState(true);
					}}
				/>
			) : segmentOptions !== null && metricsOptions !== null && isEditState ? (
				<CardEditState
					index={index}
					segmentOptions={segmentOptions}
					metricsOptions={metricsOptions}
					onEdit={onEditSubmit}
					onCancel={onCancel}
				/>
			) : (
				<LoadingState />
			)}
		</div>
	);
};

export default KPICard;
