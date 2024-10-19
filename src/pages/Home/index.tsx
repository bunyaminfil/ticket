import React, { useState, useEffect } from "react";
import { AutoComplete, DatePicker, Button, Layout } from "antd";
import { EnvironmentOutlined, SwapOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { getBusLocations, getSession } from "../../app/store/reducers/users";
import { data, locations } from "./utils";
import "./style.css";
import dayjs, { Dayjs } from "dayjs";
const { Header, Content, Footer } = Layout;

const options = [{ value: "Burns Bay Road" }, { value: "Downing Street" }, { value: "Wall Street" }];

const Home = () => {
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");

    const { busLocations } = useAppSelector((state) => state.usersReducer);

    const swapValues = () => {
        setFirstValue(secondValue);
        setSecondValue(firstValue);
    };
    const selectToday = () => {
        setSelectedDate(dayjs()); // Sets today's date
    };
    console.log(busLocations, data, locations);
    // Function to handle selecting tomorrow's date
    const selectTomorrow = () => {
        setSelectedDate(dayjs().add(1, "day")); // Sets tomorrow's date
    };

    const isTodayActive = selectedDate && selectedDate.isSame(dayjs(), "day");
    const isTomorrowActive = selectedDate && selectedDate.isSame(dayjs().add(1, "day"), "day");

    const onFetch = async () => {
        await dispatch(getBusLocations());
        // await dispatch(getSession());
        // await dispatch(
        //   getTypeListByGroupId({ typeGroupId: TypeGroups.LocationProcessTypes })
        // );
    };
    const getSession = async () => {
        try {
            const response = await axios.post(
                "https://v2-api.obilet.com/api/client/getsession",
                {
                    type: 1,
                    connection: {
                        "ip-address": "165.114.41.21",
                        port: "5117",
                    },
                    browser: {
                        name: "Chrome",
                        version: "47.0.0.12",
                    },
                },
                {
                    headers: {
                        Authorization: "Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1",
                        "Content-Type": "application/json",
                    },
                },
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    };

    useEffect(() => {
        // selectToday();
        // onFetch();
        getSession();
    }, []);

    const AutoCompleteWithIcon = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
        return (
            <div className="auto-complete-wrapper">
                <EnvironmentOutlined className="mapIcon" />
                <AutoComplete
                    style={{ width: "100%" }}
                    value={value}
                    onChange={onChange}
                    options={options}
                    placeholder="name of the city or district"
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
            </div>
        );
    };

    return (
        <div className="home">
            <Header className="header" />
            <div className="content">
                <div className="selection">
                    <div className="select">
                        <span className="select-title">From</span>
                        <AutoCompleteWithIcon value={firstValue} onChange={setFirstValue} />
                    </div>
                    <Button className="swap" onClick={swapValues} icon={<SwapOutlined />} />
                    <div className="select">
                        <span className="select-title">From</span>
                        <AutoCompleteWithIcon value={secondValue} onChange={setSecondValue} />
                    </div>
                </div>
                <div className="datepicker">
                    <div className="date">
                        <span className="date-title">Date</span>
                        <DatePicker
                            value={selectedDate ? dayjs(selectedDate) : null} // Convert to dayjs object
                            onChange={(date) => setSelectedDate(date)}
                            disabledDate={(current) => current && current < dayjs().startOf("day")} // Disable dates before today
                        />
                    </div>
                    <div className="buttons">
                        <Button className={isTodayActive ? "active-button" : ""} onClick={selectToday}>
                            Today
                        </Button>
                        <Button className={isTomorrowActive ? "active-button" : ""} onClick={selectTomorrow}>
                            Tomorrow
                        </Button>
                    </div>
                </div>
                <div className="action">
                    <Link to="/journey">
                        <Button>Find ticket</Button>
                    </Link>
                </div>
            </div>
            <div className="footer">
                <p>
                    Your journey starts here. Select your destinations and dates above!Your journey starts here. Select
                    your destinations and dates above!Your journey starts here. Select your destinations and dates
                    above!Your journey starts here. Select your destinations and dates above!Your journey starts here.
                    Select your destinations and dates above!Your journey starts here. Select your destinations and
                    dates above!
                </p>
            </div>
        </div>
    );
};

export default Home;
