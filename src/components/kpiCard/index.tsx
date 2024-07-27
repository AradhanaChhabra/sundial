import { useCallback, useState } from "react";
import { IEditKPIDataProps } from "../../App";
import { ITimeSeriesData } from "../../context/useTimeSeriesData";
import Button from "../button";
import {
	CustomSelect,
	ICategorizedOption,
	IOption,
	ISelectedCategorizedOption,
	TOption,
} from "../select";

interface IKPICardProps {
	index: number;
	data: ITimeSeriesData["values"] | null;
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

const DataOnCharts = ({ showEditMode }: { showEditMode: () => void }) => {
	return <div onClick={showEditMode}>Data On Charts</div>;
};

const KPICard = ({
	index,
	data,
	onEdit,
	segmentOptions,
	metricsOptions,
}: IKPICardProps) => {
	const [isEditState, setIsEditState] = useState(data === null);

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
			{isEditState && segmentOptions !== null && metricsOptions !== null ? (
				<CardEditState
					index={index}
					segmentOptions={segmentOptions}
					metricsOptions={metricsOptions}
					onEdit={onEditSubmit}
					onCancel={onCancel}
				/>
			) : (
				<DataOnCharts
					showEditMode={() => {
						setIsEditState(true);
					}}
				/>
			)}
		</div>
	);
};

export default KPICard;
