import clsx from "clsx";
import { useCallback, useState } from "react";
import { IKPIData, ISelectedTimeSeriesParams } from "../../App";
import { AddIcon } from "../../icons/addIcon";
import { UpwardArrowIcon } from "../../icons/upwardArrow";
import { formatNumberShorthand } from "../../utilities";
import Button from "../button";
import ChartComponent from "../chart";
import Icon from "../icon";
import {
	CustomSelect,
	ICategorizedOption,
	IOption,
	ISelectedCategorizedOption,
	TOption,
} from "../select";
import { SkeletonLoader } from "../skeletonLoader";
import { Text } from "./../text";

interface IKPICardProps {
	index: number;
	timeSeriesData: IKPIData | null;
	segmentOptions: ICategorizedOption[] | null;
	metricsOptions: IOption[] | null;
	onAddEmptyCard: () => void;
	onEdit: (d: ISelectedTimeSeriesParams) => void;
}

interface ICardEditStateProps {
	index: number;
	segmentOptions: ICategorizedOption[];
	defaultSegment?: IOption;
	defaultMetric?: IOption;
	metricsOptions: IOption[];
	onEdit: (d: ISelectedTimeSeriesParams) => void;
	onCancel: () => void;
}

const CardEditState = ({
	index,
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
						? index === 0
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
						? index === 0
							? segmentOptions?.[0].options[0]
							: undefined
						: defaultSegment
				}
				onChange={onSegmentSelectChange}
			/>

			<div className="flex flex-row justify-between gap-3">
				{index !== 0 && (
					<Button buttonType="cancel" onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button buttonType="submit" onClick={onEditKPI}>
					Add
				</Button>
			</div>
		</div>
	);
};

const DataOnCharts = ({
	showEditMode,
	kpiData: timeSeriesData,
}: {
	showEditMode: () => void;
	kpiData: IKPIData;
}) => {
	return (
		<div onClick={showEditMode} className="relative flex flex-row">
			<div className="flex flex-col justify-between gap-2">
				<div className="flex flex-col gap-2">
					<Text size="small" bold className="z-[9999999] mb-5">
						{timeSeriesData.metric?.label +
							", " +
							timeSeriesData.segment?.option.label}
					</Text>

					<Text className="mt-2 z-[9999999]" size="large" bold>
						{formatNumberShorthand(timeSeriesData.total)}
					</Text>
				</div>

				{timeSeriesData.sevenDayChange.percentage !== null && (
					<div className="flex flex-row gap-1 items-center">
						<div className="flex flex-row items-center">
							<Icon
								icon={UpwardArrowIcon}
								color={
									timeSeriesData.sevenDayChange.type === "decrement"
										? "red"
										: "green"
								}
								size="small"
								className={clsx(
									timeSeriesData.sevenDayChange.type === "decrement" &&
										"rotate-180"
								)}
							/>

							<Text as="span" size="small">
								{timeSeriesData.sevenDayChange.percentage}
							</Text>
						</div>

						<Text as="span" size="small" color="light-gray">
							Δ7d
						</Text>
					</div>
				)}
			</div>

			<div className="absolute -right-4 top-[-28px] h-[132px] w-4/5">
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
	onAddEmptyCard,
}: IKPICardProps) => {
	const [isEditState, setIsEditState] = useState(timeSeriesData === null);

	const onCancel = useCallback(() => {
		setIsEditState(false);
	}, []);

	const onEditSubmit = useCallback(
		(props: ISelectedTimeSeriesParams) => {
			onEdit(props);
			setIsEditState(false);
		},
		[onEdit]
	);

	return (
		<div id={String(index)} className="kpi-card px-6 relative group border-0">
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
						onAddEmptyCard();
						console.log("Add functionality");
					}}
				/>
			</div>

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
						onAddEmptyCard();
						console.log("Add functionality");
					}}
				/>
			</div>

			{timeSeriesData !== null && !isEditState ? (
				<DataOnCharts
					kpiData={timeSeriesData}
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
