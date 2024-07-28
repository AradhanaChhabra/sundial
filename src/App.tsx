import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./components/card";
import KPICard from "./components/kpiCard";
import { ICategorizedOption, IOption } from "./components/select";
import useTimeSeriesData, {
	ITimeSeriesData,
	ITimeSeriesParams,
} from "./context/useTimeSeriesData";
import { METRICS_API_URL, SEGMENTS_API_URL } from "./utilities";

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

	const [kpiData, setKpiData] = useState<null | ITimeSeriesData[]>(null);

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
			setKpiData([
				{
					metric: timeSeriesParams?.metric ?? null,
					segmentKey: timeSeriesParams?.segmentKey ?? null,
					segmentId: timeSeriesParams?.segmentId ?? null,
					values: data.values,
				},
			]);
			setTimeout(() => {
				setTimeSeriesParams(null);
			}, 100);
		}
	}, [
		data,
		isLoading,
		timeSeriesParams?.metric,
		timeSeriesParams?.segmentId,
		timeSeriesParams?.segmentKey,
	]);

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
				{kpiData === null || kpiData?.length === 0 ? (
					<KPICard
						index={0}
						timeSeriesData={null}
						onEdit={onEditKPI}
						segmentOptions={segmentOptions}
						metricsOptions={metricsOptions}
					/>
				) : (
					kpiData.map((kpi, index) => (
						<KPICard
							key={index}
							index={index}
							timeSeriesData={kpi}
							onEdit={onEditKPI}
							segmentOptions={segmentOptions}
							metricsOptions={metricsOptions}
						/>
					))
				)}
			</Card>
		</div>
	);
}

export default App;
