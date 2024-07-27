import { useQuery } from "@tanstack/react-query";
import { Card } from "./components/card";
import { ICategorizedOption, IOption } from "./components/select";
import KPICard from "./components/kpiCard";
import { useCallback, useEffect, useState } from "react";
import { METRICS_API_URL, SEGMENTS_API_URL } from "./utilities";
import useTimeSeriesData, {
	ITimeSeriesParams,
	ITimeSeriesData,
} from "./context/useTimeSeriesData";

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

export interface IEditKPIDataProps extends ITimeSeriesParams {}

function App() {
	const [metricsOptions, setMetricsData] = useState<IOption[] | null>(null);

	const [segmentOptions, setSegmentData] = useState<
		ICategorizedOption[] | null
	>(null);

	const [timeSeriesParams, setTimeSeriesParams] =
		useState<ITimeSeriesParams | null>(null);

	const [kpiData, setKpiData] = useState<null | ITimeSeriesData["values"]>(
		null
	);

	const { data, isLoading } = useTimeSeriesData(
		timeSeriesParams !== null
			? {
					...timeSeriesParams,
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

	const onEditKPI = useCallback(
		({ segmentId, segmentKey, metric }: IEditKPIDataProps) => {
			setTimeSeriesParams({
				segmentId,
				segmentKey,
				metric,
			});
		},
		[]
	);

	useEffect(() => {
		if (data !== undefined && data !== null && !isLoading) {
			setKpiData(data.values);
			setTimeout(() => {
				setTimeSeriesParams(null);
			}, 100);
		}
	}, [data, isLoading]);

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

	return (
		<div className="sundial-assignment-layout bg-radial-gradient h-screen flex item-center justify-center p-24">
			<Card>
				<KPICard
					index={0}
					data={kpiData}
					onEdit={onEditKPI}
					segmentOptions={segmentOptions}
					metricsOptions={metricsOptions}
				/>
			</Card>
		</div>
	);
}

export default App;
