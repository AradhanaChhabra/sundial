import { useCallback, useState } from "react";
import { GroupBase, StylesConfig } from "react-select";
import Select from "react-select";
import "./index.css";
import { areCategorizedOptions } from "../../utilities";

export interface IOption {
	value: string;
	label: string;
}

export interface ICategorizedOption {
	label: string;
	segmentKey: string;
	options: Array<Omit<IOption, "isPercentageMetric">>;
}

export type TOption = IOption | ICategorizedOption;

export interface ISelectedCategorizedOption extends IOption {
	segmentKey: string;
}

interface ICustomAsyncSelectProps {
	options: TOption[];
	defaultValue?: TOption;
	placeholder: string;
	isLoading?: boolean;
	onChange?: (option: IOption | ISelectedCategorizedOption | null) => void;
}

export const CustomSelect = ({
	options,
	placeholder,
	onChange,
	defaultValue,
	isLoading = false,
}: ICustomAsyncSelectProps) => {
	const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

	const onSelectChange = useCallback(
		(option: TOption | null) => {
			setSelectedOption(option as IOption);

			if (areCategorizedOptions(options)) {
				const segmentKey = options.find((opt) =>
					opt.options.some((o) => o.value === (option as IOption).value)
				)?.segmentKey;

				onChange?.({
					segmentKey,
					value: (option as IOption).value,
					label: (option as IOption).label,
				});
			} else {
				onChange?.(option as IOption);
			}
		},
		[onChange, options]
	);

	const customStyles: StylesConfig<TOption, false, GroupBase<TOption>> = {
		control: (provided) => ({
			...provided,
			paddingTop: 0,
			paddingBottom: 0,
			borderRadius: "8px",
			borderColor: "transparent", // Removes border color
			boxShadow: "none", // Removes box shadow
			backgroundColor: "rgba(0, 0, 0, 0.04)",
			fontWeight: 500,
			color: "rgba(0, 0, 0, 0.8)",
			fontSize: "14px",
			"&:hover": { borderColor: "transparent" }, // Keeps border color transparent on hover
		}),
		menu: (provided) => ({
			...provided,
			padding: 0,
			borderRadius: "8px",
			radius: "8px",
			borderColor: "lightgrey",
			color: "black",
		}),
		option: (provided, state) => ({
			...provided,
			padding: "6px 14px",
			backgroundColor: state.isSelected
				? "rgba(67, 56, 202, 0.1)"
				: "transparent", // Background color when option is selected
			"&:hover": {
				backgroundColor: "rgba(67, 56, 202, 0.2)", // Background color on hover
			},
			color: "rgba(0, 0, 0, 0.8)",
			fontSize: "12px",
			fontWeight: 500,
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "rgba(0, 0, 0, 0.5)", // Sets the arrow color to the current text color
			padding: "0.25rem", // Adjusts padding around the arrow
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			display: "none", // Hides the separator line between input and dropdown arrow
		}),
	};

	return (
		<Select<TOption>
			isLoading={isLoading}
			defaultValue={defaultValue}
			loadingMessage={() => "Loading options..."}
			options={options}
			onChange={onSelectChange}
			value={selectedOption}
			placeholder={placeholder}
			styles={customStyles}
			classNamePrefix="react-select"
			menuPortalTarget={document.body}
		/>
	);
};
