import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ITimeSeriesData } from "../../context/useTimeSeriesData";

const ChartComponent = ({ data }: { data: ITimeSeriesData["values"] }) => {
	const formattedData = data
		.map((item) => [new Date(item.date).getTime(), item.value])
		.sort((a, b) => a[0] - b[0]);

	const options = {
		chart: {
			type: "area",
			backgroundColor: "transparent",
			height: 134,
			marginBottom: 20,
		},
		title: {
			text: "",
		},
		xAxis: {
			visible: false,
		},
		yAxis: {
			visible: false,
			minTickInterval: 100,
			offset: -40,
			title: {
				text: null,
			},
		},
		plotOptions: {
			area: {
				fillOpacity: 1,
				marker: {
					enabled: false,
				},
				color: "rgba(17, 159, 151, 0.7)",
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
				linecap: "round",
				linejoin: "round",
				lineWidth: 2,
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
						[0, "rgba(17, 159, 151, 0.3)"], // Start with full opacity
						[0.6, "rgba(17, 159, 151,  0.2)"], // Midway with half opacity
						[1, "rgba(17, 159, 151, 0)"],
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
					bottom: 0,
					left: 0,
					width: "40%",
					height: "134px",
					zIndex: 111,
					filter: "blur(10px)",
					background:
						"linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))",
					pointerEvents: "none",
				}}
			></div>

			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export { ChartComponent };
