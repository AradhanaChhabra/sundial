import { IKPIData } from "../App";
import { ICategorizedOption, TOption } from "../components/select";
import { ITimeSeriesData } from "../context/useTimeSeriesData";

export const BASE_API_URL = "https://sundial-fe-interview.vercel.app/api";

export const METRICS_API_URL = `${BASE_API_URL}/metrics`;

export const SEGMENTS_API_URL = `${BASE_API_URL}/segments`;

export const TIME_SERIES_API_URL = `${BASE_API_URL}/snapshot`;

export function isTruthyValue(a: any) {
	return a !== undefined && a !== null && a !== "" && a !== false;
}

export function areCategorizedOptions(
	options: TOption[]
): options is ICategorizedOption[] {
	return (
		options.length > 0 && options[0] !== undefined && "options" in options[0]
	);
}

export const formatNumberShorthand = (n: number): string => {
	if (n < 1e3) return String(n);
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";

	return String(n);
};

export const calculate7DayChange = (
	data: ITimeSeriesData["values"]
): IKPIData["sevenDayChange"] => {
	// not enough data to calculate the change
	data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	if (data.length < 7)
		return {
			percentage: null,
			type: "decrement",
		};

	const mostRecentValue = data[data.length - 1].value;
	const sevenDaysAgoValue = data[data.length - 7].value;

	console.log(data[data.length - 1].value, data[data.length - 7].value);

	const percentageChange =
		((mostRecentValue - sevenDaysAgoValue) / sevenDaysAgoValue) * 100;

	return {
		percentage: Math.abs(Number(percentageChange.toFixed(1))) + "%",
		type: percentageChange > 0 ? "increment" : "decrement",
	};
};
