import { ICategorizedOption, TOption } from "../components/select";

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
