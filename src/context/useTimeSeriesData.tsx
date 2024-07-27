import { useQuery } from "@tanstack/react-query";
import { TIME_SERIES_API_URL } from "../utilities";

export interface ITimeSeriesParams {
	segmentId: string;
	segmentKey: string;
	metric: string;
}

export interface ITimeSeriesDataProps {
	segmentId?: string;
	segmentKey?: string;
	metric?: string;
	enableQuery?: boolean;
}

export interface ITimeSeriesData {
	metric: string | null;
	segmentKey: string | null;
	segmentId: string | null;
	values: Array<{
		date: string;
		value: number;
	}>;
}

interface ITimeSeriesDataContext {
	data?: ITimeSeriesData;
	isLoading?: boolean;
}

export const chartDataQueryKey = ({
	segmentId,
	segmentKey,
	metric,
}: ITimeSeriesParams): string[] => [segmentId, segmentKey, metric];

const useTimeSeriesData = ({
	segmentId,
	segmentKey,
	metric,
	enableQuery = true,
}: ITimeSeriesDataProps): ITimeSeriesDataContext => {
	const { data, isLoading } = useQuery<{ data: ITimeSeriesData }>({
		queryKey: chartDataQueryKey({
			segmentId: String(segmentId),
			segmentKey: String(segmentKey),
			metric: String(metric),
		}),
		queryFn: async () => {
			if (!segmentId || !segmentKey || !metric) return;

			const response = await fetch(
				`${TIME_SERIES_API_URL}?metric=${metric}&segmentKey=${segmentKey}&segmentId=${segmentId}`,
				{
					method: "POST",
				}
			);
			return response.json();
		},
		enabled: enableQuery,
	});

	return { data: data?.data, isLoading };
};

export default useTimeSeriesData;
