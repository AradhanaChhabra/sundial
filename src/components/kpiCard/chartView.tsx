import clsx from "clsx";
import { IKPIData } from "../../App";
import { UpwardArrowIcon } from "../../icons/upwardArrow";
import { formatNumberShorthand } from "../../utilities";
import { ChartComponent } from "../chart";
import { Icon } from "../icon";
import { Text } from "../text";

interface IChartViewProps {
	noOfCards: number;
	showEditMode: () => void;
	kpiData: IKPIData;
}

const ChartView = ({
	noOfCards,
	showEditMode,
	kpiData: timeSeriesData,
}: IChartViewProps) => {
	return (
		<div onClick={showEditMode} className="relative w-full flex flex-row ">
			<div className="flex flex-col justify-between gap-2 overflow-hidden ">
				<div className="flex flex-col gap-2 w-full">
					<Text
						size="small"
						bold
						className="z-[1111] mb-5 !truncate max-w-[100%] w-full"
					>
						{timeSeriesData.metric?.label +
							", " +
							timeSeriesData.segment?.option.label}
					</Text>

					<Text className="mt-2 z-[1111]" size="large" bold>
						{formatNumberShorthand(timeSeriesData.total)}
					</Text>
				</div>

				{timeSeriesData.sevenDayChange.percentage !== null && (
					<div className="flex flex-row gap-1 items-center">
						<div className="flex flex-row items-center">
							<Icon
								icon={UpwardArrowIcon}
								color={
									timeSeriesData.sevenDayChange.type === "decrement"
										? "red"
										: "green"
								}
								size="small"
								className={clsx(
									timeSeriesData.sevenDayChange.type === "decrement" &&
										"rotate-180"
								)}
							/>

							<Text as="span" size="small">
								{timeSeriesData.sevenDayChange.percentage}
							</Text>
						</div>

						<Text
							as="span"
							size="small"
							color="light-gray"
							className="inline-block z-[1111]"
						>
							Δ7d
						</Text>
					</div>
				)}
			</div>

			<div
				className={clsx(
					"absolute -right-4 top-[-14px] h-[132px] w-4/5 ",
					Number(noOfCards) > 3
						? "!w-3/5 !max-w-[130px] h-[80]px !top-[10px]"
						: Number(noOfCards) > 1
						? "!w-4/6 h-[80px] !top-[6px]"
						: "!w-4/5"
				)}
			>
				<ChartComponent data={timeSeriesData.values} />
			</div>
		</div>
	);
};

export { ChartView };
