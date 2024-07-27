import { Card } from "./components/card";
import { ICategorizedOption, CustomSelect } from "./components/select";

const OPTIONS: ICategorizedOption[] = [
	{
		segmentKey: "platform",
		label: "Platform",
		options: [
			{
				value: "ios",
				label: "iOS",
			},
			{
				value: "android",
				label: "Android",
			},
			{
				value: "web",
				label: "Web",
			},
		],
	},
	{
		segmentKey: "country",
		label: "Country",
		options: [
			{
				value: "us",
				label: "United States",
			},
			{
				value: "uk",
				label: "United Kingdom",
			},
			{
				value: "india",
				label: "India",
			},
			{
				value: "canada",
				label: "Canada",
			},
			{
				value: "australia",
				label: "Australia",
			},
		],
	},
];

function App() {
	return (
		<div className="sundial-assignment-layout bg-radial-gradient h-screen flex item-center justify-center p-24">
			<Card>
				<CustomSelect placeholder="abcde" options={OPTIONS} />
			</Card>
		</div>
	);
}

export default App;
