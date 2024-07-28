import { useState, useCallback } from "react";
import { ISelectedTimeSeriesParams } from "../../App";
import Button from "../button";
import {
	ICategorizedOption,
	IOption,
	ISelectedCategorizedOption,
	TOption,
	CustomSelect,
} from "../select";

interface ICardEditStateProps {
	noOfCards: number;
	segmentOptions: ICategorizedOption[];
	defaultSegment?: IOption;
	defaultMetric?: IOption;
	metricsOptions: IOption[];
	onEdit: (d: ISelectedTimeSeriesParams) => void;
	onCancel: () => void;
}

const EditView = ({
	noOfCards,
	segmentOptions,
	metricsOptions,
	defaultSegment,
	defaultMetric,
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
			metric: {
				value: selectedMetric.value,
				label: selectedMetric.label,
			},
			segment: {
				segmentKey: selectedSegmentOption.segmentKey,
				segmentLabel: selectedSegmentOption.segmentLabel,
				option: {
					value: selectedSegmentOption.value,
					label: selectedSegmentOption.label,
				},
			},
		});
	}, [onEdit, selectedMetric, selectedSegmentOption]);

	return (
		<div className="flex flex-col gap-3">
			<CustomSelect
				placeholder="Select a metric"
				defaultValue={
					defaultMetric === undefined
						? noOfCards === 1
							? metricsOptions?.[0]
							: undefined
						: defaultMetric
				}
				options={metricsOptions}
				onChange={onMetricSelectChange}
			/>

			<CustomSelect
				placeholder="Select a segment"
				options={segmentOptions}
				defaultValue={
					defaultSegment === undefined
						? noOfCards === 1
							? segmentOptions?.[0].options[0]
							: undefined
						: defaultSegment
				}
				onChange={onSegmentSelectChange}
			/>

			<div className="flex flex-row justify-between gap-3">
				{noOfCards > 1 && (
					<Button buttonType="cancel" onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button
					buttonType="submit"
					onClick={onEditKPI}
					disabled={selectedMetric === null || selectedSegmentOption === null}
				>
					Add
				</Button>
			</div>
		</div>
	);
};

export default EditView;
