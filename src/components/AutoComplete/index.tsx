import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import type { ILocation } from "../../types/location.types";

const { Option } = Select;

interface AutoCompleteWithIconProps {
    value: null | string;
    onChange: (value: ILocation) => void;
    onSearch: (value: string) => void;
    busLocations: ILocation[];
}

const AutoCompleteWithIcon: React.FC<AutoCompleteWithIconProps> = ({ value, onChange, onSearch, busLocations }) => {
    const [searchText, setSearchText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = debounce((inputValue: string) => {
        setSearchText(inputValue);
        setIsDropdownOpen(!!inputValue);
    }, 300);

    const handleSelect = (selectedValue: string) => {
        const filter = busLocations.find((location) => location.name === selectedValue);
        onChange(filter as ILocation);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (searchText) {
            setSearchText("");
            onSearch(searchText);
        }
    }, [searchText, onSearch]);

    return (
        <div className="auto-complete-wrapper">
            <EnvironmentOutlined className="mapIcon" />
            <Select
                style={{ width: "100%" }}
                suffixIcon={null}
                value={value}
                showSearch={true}
                onSearch={handleSearch}
                onChange={handleSelect}
                filterOption={false}
                open={isDropdownOpen}
                notFoundContent={searchText.length === 0 ? <Spin size="small" /> : null}
            >
                {busLocations
                    ?.filter((location: ILocation) => location.name.toUpperCase().includes(searchText.toUpperCase()))
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
