import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Button, Layout } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import UAParser from "ua-parser-js";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { getSession } from "../../app/store/reducers/users";
import { getBusLocations } from "../../app/store/reducers/locations";
import AutoComplete from "../../components/AutoComplete";
import "./style.css";
import dayjs, { Dayjs } from "dayjs";
import { ILocation } from "../../app/types/locationTypes";
const { Header } = Layout;

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [firstValue, setFirstValue] = useState<string | null>(null);
    const [secondValue, setSecondValue] = useState<string | null>(null);
    const [firstSelectedObject, setFirstSelectedObject] = useState<ILocation>();
    const [secondSelectedObject, setSecondSelectedObject] = useState<ILocation>();
    const firstRunRef = useRef<boolean>(true);
    const fetchAgain = useRef<boolean>();

    const { busLocations } = useAppSelector((state) => state.locationsReducer);

    const swapValues = () => {
        const tempFirst = firstSelectedObject;
        setFirstSelectedObject(secondSelectedObject);
        setSecondSelectedObject(tempFirst);
    };
    const selectToday = () => {
        setSelectedDate(dayjs()); // Sets today's date
    };

    // Function to handle selecting tomorrow's date
    const selectTomorrow = () => {
        setSelectedDate(dayjs().add(1, "day")); // Sets tomorrow's date
    };

    const isTodayActive = selectedDate && selectedDate.isSame(dayjs(), "day");
    const isTomorrowActive = selectedDate && selectedDate.isSame(dayjs().add(1, "day"), "day");

    const onClick = () => {
        const date = dayjs(selectedDate).format("YYYY-MM-DD");
        const ticketData = {
            "origin-id": firstSelectedObject?.id,
            "destination-id": secondSelectedObject?.id,
            "departure-date": date,
        };

        navigate("/journey", { state: { ticketData } });
    };

    const onFetch = async (input: string | null) => {
        const sessionId = localStorage.getItem("session-id");
        const deviceId = localStorage.getItem("device-id");

        const payload = {
            data: input,
            "device-session": {
                "session-id": sessionId,
                "device-id": deviceId,
            },
            date: new Date().toISOString(),
            language: "tr-TR",
        };

        await dispatch(getBusLocations(payload));
    };

    const fetchIP = async () => {
        try {
            // Fetch IP address from ipify or another service
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            const ipAddress = data.ip;

            // Get browser information
            const parser = new UAParser();
            const browser = parser.getBrowser();
            const res = await dispatch(
                getSession({
                    type: 7,
                    connection: {
                        "ip-address": ipAddress,
                        port: "5117",
                    },
                    browser: {
                        name: browser.name || "",
                        version: browser.version || "",
                    },
                }),
            );
            if (res.payload.status === "Success") {
                localStorage.setItem("session-id", res.payload.data["session-id"]);
                localStorage.setItem("device-id", res.payload.data["device-id"]);
            }
        } catch (error) {
            console.error("Error fetching IP address:", error);
        }
    };
    useEffect(() => {
        const sessionId = localStorage.getItem("session-id");
        const deviceId = localStorage.getItem("device-id");
        if (sessionId && deviceId) {
            onFetch(null);
        } else {
            fetchIP();
        }
    }, []);

    useEffect(() => {
        if (firstValue && fetchAgain.current) {
            onFetch(firstValue); // Call the function to fetch locations based on secondValue
        }
    }, [firstValue]);
    useEffect(() => {
        if (secondValue && fetchAgain.current) {
            onFetch(secondValue); // Call the function to fetch locations based on secondValue
        }
    }, [secondValue]);
    useEffect(() => {
        if (busLocations.length && firstRunRef.current) {
            setFirstSelectedObject(busLocations[0]); // Call the function to fetch locations based on secondValue
            setSecondSelectedObject(busLocations[1]); // Call the function to fetch locations based on secondValue
            firstRunRef.current = false;
            fetchAgain.current = false;
        }
    }, [busLocations]);
    useEffect(() => {
        if (firstSelectedObject) {
            setFirstValue(firstSelectedObject.name);
            fetchAgain.current = false;
        } else {
            setFirstValue("");
        }
    }, [firstSelectedObject]);
    useEffect(() => {
        if (secondSelectedObject) {
            setSecondValue(secondSelectedObject.name);
            fetchAgain.current = false;
        } else {
            setSecondValue("");
        }
    }, [secondSelectedObject]);

    /* Function to handle selecting values */
    const handleFirstValueChange = (value: ILocation) => {
        if (value.id === secondSelectedObject?.id) {
            setSecondSelectedObject(firstSelectedObject);
        }
        setFirstSelectedObject(value);
    };

    const handleSecondValueChange = (value: any) => {
        setSecondSelectedObject(value);
        if (value.id === firstSelectedObject?.id) {
            setFirstSelectedObject(secondSelectedObject);
        }
    };

    return (
        <div className="home">
            <Header className="header" />
            <div className="content">
                <div className="selection">
                    <div className="select">
                        <span className="select-title">From</span>
                        <AutoComplete
                            value={firstValue}
                            onChange={handleFirstValueChange}
                            onSearch={(value) => {
                                setFirstValue(value);
                                fetchAgain.current = true;
                            }}
                            busLocations={busLocations}
                        />
                    </div>
                    <Button className="swap" onClick={swapValues} icon={<SwapOutlined />} />
                    <div className="select">
                        <span className="select-title">To</span>
                        <AutoComplete
                            value={secondValue}
                            onChange={handleSecondValueChange}
                            onSearch={(value) => {
                                setSecondValue(value);
                                fetchAgain.current = true;
                            }}
                            busLocations={busLocations}
                        />
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
                    {/* <Link to="/journey"> */}
                    <Button onClick={onClick}>Find ticket</Button>
                    {/* </Link> */}
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
