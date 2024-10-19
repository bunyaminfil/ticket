import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import { ILocation } from "../../app/types/locationTypes";

const { Option } = Select;

interface AutoCompleteWithIconProps {
    value: null | string; // For multiple selections, value should be an array
    onChange: (value: ILocation) => void; // Update handler to accept array of strings
    onSearch: (value: string) => void; // Update handler to accept array of strings
    busLocations: ILocation[]; // Array of location data
}

const AutoCompleteWithIcon: React.FC<AutoCompleteWithIconProps> = ({ value, onChange, onSearch, busLocations }) => {
    const [searchText, setSearchText] = useState(""); // Track input text
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Control dropdown visibility

    // Debounce search text update
    const handleSearch = debounce((inputValue: string) => {
        setSearchText(inputValue); // Update search text dynamically
        setIsDropdownOpen(!!inputValue); // Keep dropdown open if input is not empty
    }, 300); // 300ms debounce
    // Handle selecting an option
    const handleSelect = (selectedValue: string) => {
        const filter = busLocations.find((location) => location.name === selectedValue);
        onChange(filter as ILocation); // Set the selected value
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    // Trigger the change event (debounced)
    useEffect(() => {
        if (searchText) {
            setSearchText("");
            onSearch(searchText); // Send the request when the user stops typing
        }
    }, [searchText, onSearch]);

    return (
        <div className="auto-complete-wrapper">
            <EnvironmentOutlined className="mapIcon" />
            <Select
                style={{ width: "100%" }}
                suffixIcon={null}
                value={value} // Use the controlled value
                showSearch={true} // Enable search functionality
                onSearch={handleSearch} // Update input with debounce
                onChange={handleSelect} // Update value on selecting an option
                filterOption={false} // Do not filter automatically, we will handle it
                open={isDropdownOpen} // Control dropdown visibility
                notFoundContent={searchText.length === 0 ? <Spin size="small" /> : null}
            >
                {busLocations
                    ?.filter(
                        (location: ILocation) => location.name.toUpperCase().includes(searchText.toUpperCase()), // Filter options based on search input
                    )
                    .map((opt: { id: number; name: string }) => (
                        <Option key={opt.id} value={opt.name}>
                            {opt.name}
                        </Option>
                    ))}
            </Select>
        </div>
    );
};

export default AutoCompleteWithIcon;
