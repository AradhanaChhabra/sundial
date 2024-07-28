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

function App() {
	const [metricsOptions, setMetricsData] = useState<IOption[] | null>(null);

	const [segmentOptions, setSegmentData] = useState<
		ICategorizedOption[] | null
	>(null);

	const [timeSeriesParams, setTimeSeriesParams] =
		useState<ISelectedTimeSeriesParams | null>(null);

	const [kpiData, setKpiData] = useState<Array<null | IKPIData>>([null]);

	const { data, isLoading } = useTimeSeriesData(
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

	const onEditKPI = useCallback((props: ISelectedTimeSeriesParams) => {
		setTimeSeriesParams({
			...props,
		});
	}, []);

	useEffect(() => {
		if (data !== undefined && data !== null && !isLoading) {
			const total = data.values.reduce((a, b) => a + b.value, 0);

			setKpiData([
				{
					metric: timeSeriesParams?.metric ?? null,
					segment: timeSeriesParams?.segment ?? null,
					values: data.values,
					total,
					sevenDayChange: calculate7DayChange(data.values),
				},
			]);

			setTimeout(() => {
				setTimeSeriesParams(null);
			}, 100);
		}
	}, [data, isLoading, timeSeriesParams?.metric, timeSeriesParams]);

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
	}, [isLoadingMetrics, isLoadingSegmentData, metricsData, segmentData]);

	const onAddEmptyCard = useCallback(() => {
		setKpiData((prev) => {
			if (prev !== null) {
				return [...prev, null];
			}

			return [null];
		});
	}, []);

	return (
		<div className="sundial-assignment-layout bg-radial-gradient h-screen flex item-center justify-center p-24">
			{/* TODO: horizontal line to be added */}
			<Card
				className={clsx(
					"grid divide-light-gray gap-y-12",
					kpiData.length < 2
						? "grid-cols-1"
						: kpiData.length < 3
						? "grid-cols-2 divide-x-[1px]"
						: "grid-cols-3 divide-x-[1px]"
				)}
				data-length={kpiData.length < 2 ? 1 : kpiData.length < 3 ? 2 : 3}
			>
				{kpiData.map((kpi, index) => (
					<KPICard
						key={index}
						index={index}
						timeSeriesData={kpi}
						onEdit={onEditKPI}
						segmentOptions={segmentOptions}
						metricsOptions={metricsOptions}
						onAddEmptyCard={onAddEmptyCard}
					/>
				))}
			</Card>
		</div>
	);
}

export default App;
