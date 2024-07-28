// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ITimeSeriesData } from "../../context/useTimeSeriesData";

const ChartComponent = ({ data }: { data: ITimeSeriesData["values"] }) => {
	// Format the data if necessary
	const formattedData = data.map((item) => [Date.parse(item.date), item.value]);

	const values = data.map((item) => item.value);
	const minValue = Math.min(...values);
	const maxValue = Math.max(...values);

	// Adjust min and max to make the line float on top
	const yAxisMin = minValue - (maxValue - minValue) * 0.2; // 20% below the minimum value
	const yAxisMax = maxValue + (maxValue - minValue) * 0.1; // 10% above the maximum value

	const options = {
		chart: {
			type: "area",
			backgroundColor: "transparent",
			height: 134,
		},
		title: {
			text: "",
		},
		xAxis: {
			visible: false,
		},
		yAxis: {
			visible: false,
			min: yAxisMin,
			max: yAxisMax,
			title: {
				text: null,
			},
		},
		plotOptions: {
			area: {
				fillOpacity: 1, // Increase area covered below the line
				marker: {
					enabled: false,
				},
				color: "rgba(124, 181, 236, 0.8)",
				states: {
					hover: {
						enabled: false,
					},
				},
				linecap: "round",
				linejoin: "round",
			},
			series: {
				pointPlacement: "on",
				linecap: "round", // Make edges more rounded
				linejoin: "round", // Ensure line joins are rounded
				lineWidth: 2, // Adjust line width
				dataLabels: {
					enabled: false,
				},
				marker: {
					enabled: false,
				},
				states: {
					hover: {
						enabled: false,
					},
				},
			},
		},
		series: [
			{
				type: "area",
				name: "Values",
				data: formattedData,
				fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, "rgba(124, 181, 236, 0.8)"],
						[1, "rgba(124, 181, 236, 0)"],
					],
				},
				lineWidth: 1.5,
			} as Highcharts.SeriesAreaOptions,
		],
		credits: {
			enabled: false,
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			enabled: false,
		},
	};

	return (
		<div style={{ position: "relative", maxHeight: "134px" }}>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "30%",
					height: "134px",
					zIndex: 1111,
					filter: "blur(10px)",
					background:
						"linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
					pointerEvents: "none",
				}}
			></div>

			{/* <div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					height: "40%",
					zIndex: 1111,
					filter: "blur(10px)",
					background:
						"linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))",
					pointerEvents: "none",
				}}
			></div> */}

			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default ChartComponent;
