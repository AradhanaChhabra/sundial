import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./components/card";
import KPICard from "./components/kpiCard";
import { ICategorizedOption, IOption } from "./components/select";
import useTimeSeriesData, {
	ITimeSeriesData,
} from "./context/useTimeSeriesData";
import {
	calculate7DayChange,
	METRICS_API_URL,
	SEGMENTS_API_URL,
} from "./utilities";
import clsx from "clsx";
import "./App.css";
import { LoadingState } from "./components/kpiCard/loadingState";

type TSevenDayChange = "increment" | "decrement";

interface IMetricsAPIData {
	data: Array<{
		id: string;
		displayName: string;
		isPercentageMetric: boolean;
	}>;
}

interface ISegmentAPIData {
	data: Array<{
		segmentKey: string;
		displayName: string;
		values: Array<{
			segmentId: string;
			displayName: string;
		}>;
	}>;
}

export interface IKPIData extends ISelectedTimeSeriesParams {
	values: ITimeSeriesData["values"];
	total: number;
	editMode: boolean;
	sevenDayChange: {
		percentage: string | null;
		type: TSevenDayChange;
	};
}

export interface ISelectedTimeSeriesParams {
	metric: IOption | null;
	segment: {
		segmentKey: string;
		segmentLabel: string;
		option: IOption;
	} | null;
}

export interface IEditKPIProps extends ISelectedTimeSeriesParams {
	index: number;
}

function App() {
	const [metricsOptions, setMetricsData] = useState<IOption[] | null>(null);

	const [segmentOptions, setSegmentData] = useState<
		ICategorizedOption[] | null
	>(null);

	const [timeSeriesParams, setTimeSeriesParams] =
		useState<IEditKPIProps | null>(null);

	const [initialLoad, setInitialLoad] = useState(true);

	const [kpiData, setKpiData] = useState<Array<null | IKPIData>>([null]);

	const { data, isLoading, isFetched } = useTimeSeriesData(
		timeSeriesParams !== null
			? {
					metric: timeSeriesParams?.metric?.value,
					segmentKey: timeSeriesParams?.segment?.segmentKey,
					segmentId: timeSeriesParams?.segment?.option.value,
					enableQuery: true,
			  }
			: {
					enableQuery: false,
			  }
	);

	const { isPending: isLoadingMetrics, data: metricsData } =
		useQuery<IMetricsAPIData>({
			queryKey: ["metrics"],
			queryFn: () => fetch(METRICS_API_URL).then((res) => res.json()),
		});

	const { isPending: isLoadingSegmentData, data: segmentData } =
		useQuery<ISegmentAPIData>({
			queryKey: ["segments"],
			queryFn: () => fetch(SEGMENTS_API_URL).then((res) => res.json()),
		});

	const onEditKPI = useCallback((props: IEditKPIProps) => {
		setTimeSeriesParams({
			...props,
		});
	}, []);

	// set kpi data on time series params change
	useEffect(() => {
		if (
			data !== undefined &&
			data !== null &&
			!isLoading &&
			timeSeriesParams !== null
		) {
			const total = data.values.reduce((a, b) => a + b.value, 0);

			setKpiData((prev) => {
				const newData = [...prev];

				newData[timeSeriesParams.index] = {
					metric: timeSeriesParams?.metric ?? null,
					segment: timeSeriesParams?.segment ?? null,
					values: data.values,
					total,
					sevenDayChange: calculate7DayChange(data.values),
					editMode: false,
				};

				return newData;
			});
		}
	}, [data, isLoading, timeSeriesParams?.metric, timeSeriesParams]);

	// load options
	useEffect(() => {
		if (
			metricsData !== undefined &&
			metricsData !== null &&
			!isLoadingMetrics
		) {
			setMetricsData(
				metricsData.data.map((data) => ({
					value: data.id,
					label: data.displayName,
				}))
			);
		}
		if (
			segmentData !== undefined &&
			segmentData !== null &&
			!isLoadingSegmentData
		) {
			setSegmentData(
				segmentData.data.map((data) => ({
					segmentKey: data.segmentKey,
					label: data.displayName,
					options: data.values.map((value) => ({
						value: value.segmentId,
						label: value.displayName,
					})),
				}))
			);
		}
	}, [
		isLoadingMetrics,
		isLoadingSegmentData,
		kpiData,
		metricsData,
		segmentData,
	]);

	// initial load data
	useEffect(() => {
		if (
			!(kpiData.length > 1) &&
			!isLoading &&
			metricsData !== undefined &&
			metricsData !== null &&
			segmentData !== undefined &&
			segmentData !== null
		) {
			if (kpiData.length === 1 && kpiData[0] === null) {
				setTimeSeriesParams({
					index: 0,
					metric: {
						value: metricsData.data[0].id,
						label: metricsData.data[0].displayName,
					},
					segment: {
						segmentKey: segmentData.data[0].segmentKey,
						segmentLabel: segmentData.data[0].displayName,
						option: {
							value: segmentData.data[0].values[0].segmentId,
							label: segmentData.data[0].values[0].displayName,
						},
					},
				});
			}
		}
	}, [isLoading, kpiData, metricsData, segmentData]);

	const onAddEmptyCard = useCallback((index: number) => {
		setKpiData((prev) => {
			if (prev !== null) {
				const newData: Array<null | IKPIData> = prev.slice(0, index);

				newData.push(null);

				return [...newData, ...prev.slice(index, prev.length)];
			}

			return [null];
		});
	}, []);

	const onDeleteCard = useCallback((index: number) => {
		setKpiData((prev) => {
			return [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)];
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setInitialLoad(false);
		}, 700);
	}, []);

	return (
		<div className="sundial-assignment-layout bg-radial-gradient h-screen flex item-center justify-center p-4 md:p-24">
			<Card
				className={clsx(
					"no-scrollbar grid grid-cols-1 divide-light-gray gap-y-12 self-center !max-h-[84lvh] !w-[96vw] md:!w-[80lvw] lg:!w-[816px] lg:!max-w-[816px]  md:!max-w-[90lvw] overflow-y-scroll",
					kpiData.length === 2
						? "md:grid-cols-2 md:divide-x-[1px]"
						: kpiData.length >= 3
						? "md:grid-cols-2 lg:grid-cols-3 md:divide-x-[1px]"
						: ""
				)}
				data-length={kpiData.length < 2 ? 1 : kpiData.length < 3 ? 2 : 3}
			>
				{initialLoad ? (
					<div className="kpi-card px-6 border-0 ">
						<LoadingState />
					</div>
				) : (
					kpiData.map((kpi, index) => (
						<KPICard
							key={`${index}+${kpi === null ? 0 : 1}`}
							editMode={isLoading ? false : kpi === null ? true : kpi.editMode}
							noOfCards={kpiData.length}
							isLoading={
								isLoading ||
								isLoadingMetrics ||
								isLoadingSegmentData ||
								!isFetched
							}
							index={index}
							timeSeriesData={kpi}
							onEdit={onEditKPI}
							segmentOptions={segmentOptions}
							metricsOptions={metricsOptions}
							onAddEmptyCard={onAddEmptyCard}
							onDeleteCard={onDeleteCard}
						/>
					))
				)}
			</Card>
		</div>
	);
}

export default App;
