import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Button, Layout, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import UAParser from "ua-parser-js";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getSession } from "../../store/reducers/users";
import { getBusLocations } from "../../store/reducers/locations";
import AutoComplete from "../../components/AutoComplete";
import dayjs, { Dayjs } from "dayjs";
import type { ILocation } from "../../types/location.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./style.css";

const { Header } = Layout;

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [storedLocations, setStoredLocations] = useLocalStorage("locations", {});
    const [{ sessionId, deviceId }, setSession] = useLocalStorage<{ sessionId: string; deviceId: string }>("sessions", {
        sessionId: "",
        deviceId: "",
    });

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(1, "day"));
    const [firstValue, setFirstValue] = useState<string | null>(null);
    const [secondValue, setSecondValue] = useState<string | null>(null);
    const [firstSelectedObject, setFirstSelectedObject] = useState<ILocation>();
    const [secondSelectedObject, setSecondSelectedObject] = useState<ILocation>();

    const { busLocations } = useAppSelector((state) => state.locationsReducer);

    const swapValues = () => {
        const tempFirst = firstSelectedObject;
        setFirstSelectedObject(secondSelectedObject);
        setSecondSelectedObject(tempFirst);
    };
    const selectToday = () => {
        setSelectedDate(dayjs());
    };

    const selectTomorrow = () => {
        setSelectedDate(dayjs().add(1, "day"));
    };

    const isTodayActive = selectedDate && selectedDate.isSame(dayjs(), "day");
    const isTomorrowActive = selectedDate && selectedDate.isSame(dayjs().add(1, "day"), "day");

    const handleFindClicked = () => {
        const date = dayjs(selectedDate).format("YYYY-MM-DD");

        const locations = { origin: firstSelectedObject, destination: secondSelectedObject, date };
        setStoredLocations(locations);

        const uri = `/journey?originId=${firstSelectedObject?.id}&destinationId=${secondSelectedObject?.id}&date=${date}`;
        const encoded = encodeURI(uri);
        navigate(encoded);
    };

    const fetchLocations = async (input: string | null) => {
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
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            const ipAddress = data.ip;

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
                setSession({
                    sessionId: res.payload.data["session-id"],
                    deviceId: res.payload.data["device-id"],
                });
            }
        } catch (error) {
            message.error("Error getting session!");
        }
    };

    useEffect(() => {
        if (sessionId && deviceId) {
            fetchLocations(null);
        } else {
            fetchIP();
        }
    }, [sessionId, deviceId]);

    const firstRunRef = useRef<boolean>(true);
    const fetchAgain = useRef<boolean>();

    useEffect(() => {
        if (busLocations.length && firstRunRef.current) {
            setFirstSelectedObject(storedLocations.origin ?? busLocations[0]);
            setSecondSelectedObject(storedLocations.destination ?? busLocations[1]);
            if (storedLocations.date) setSelectedDate(dayjs(storedLocations.date));
            firstRunRef.current = false;
            fetchAgain.current = false;
        }
    }, [busLocations]);

    useEffect(() => {
        if (firstValue && fetchAgain.current) {
            fetchLocations(firstValue);
        }
    }, [firstValue]);

    useEffect(() => {
        if (secondValue && fetchAgain.current) {
            fetchLocations(secondValue);
        }
    }, [secondValue]);

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
                            value={selectedDate ? dayjs(selectedDate) : null}
                            onChange={(date) => setSelectedDate(date)}
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
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
                    <Button onClick={handleFindClicked}>Find ticket</Button>
                </div>
            </div>
            <div className="footer">
                <p>
                    Welcome to Travel Agent, where we offer personalized travel services to make your journeys smooth
                    and memorable. From flight bookings to holiday packages and travel insurance, we provide everything
                    you need for a hassle-free trip. With expert guidance and 24/7 support, we’re committed to ensuring
                    your satisfaction every step of the way.
                </p>
            </div>
        </div>
    );
};

export default Home;
