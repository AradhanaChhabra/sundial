import { useState } from "react";
import { GroupBase, StylesConfig } from "react-select";
import Select from "react-select";

export interface IOption {
	value: string;
	label: string;
}

export interface ICategorizedOption {
	label: string;
	segmentKey: string;
	options: IOption[];
}

export type TOption = IOption | ICategorizedOption;

interface ICustomAsyncSelectProps {
	// loadOptions: (inputValue: string) => Promise<TOption[]>;
	options: TOption[];
	placeholder: string;
}

export const CustomSelect = ({
	options,
	placeholder,
}: ICustomAsyncSelectProps) => {
	const [selectedOption, setSelectedOption] = useState<TOption | null>(null);

	const customStyles: StylesConfig<TOption, false, GroupBase<TOption>> = {
		control: (provided) => ({
			...provided,
			padding: 0,
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
			options={options}
			onChange={(s) => {
				setSelectedOption(s);
			}}
			value={selectedOption}
			placeholder={placeholder}
			styles={customStyles}
			classNamePrefix="react-select"
		/>
	);
};
