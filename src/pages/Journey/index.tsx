import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import DestinationCard from "../../components/DestinationCard";
import { getJourneys } from "../../app/store/reducers/journeys";
import { Empty } from "antd";
import dayjs from "dayjs";
import { IJourneys } from "../../app/types/journeyTypes";
import "./style.css";

const Journey = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const ticketData = location.state?.ticketData;

    const { journeys } = useAppSelector((state) => state.journeysReducer);

    const onFetch = async () => {
        const sessionId = localStorage.getItem("session-id");
        const deviceId = localStorage.getItem("device-id");

        const payload = {
            "device-session": {
                "session-id": sessionId,
                "device-id": deviceId,
            },
            date: ticketData["departure-date"],
            language: "tr-TR",
            data: ticketData,
        };

        await dispatch(getJourneys(payload));
    };
    useEffect(() => {
        onFetch();
    }, []);

    return (
        <div className="journey">
            <div className="header">
                <div className="icon">
                    <Link to="/">
                        <ArrowLeftOutlined style={{ color: "white" }} />
                    </Link>
                </div>
                <div className="header-center">
                    {journeys.length > 0 ? (
                        <span className="states">
                            {journeys[0]["origin-location"]} - {journeys[0]["destination-location"]}
                        </span>
                    ) : null}
                    <span className="date">{dayjs(ticketData["departure-date"]).format("D MMMM dddd")}</span>
                </div>
            </div>
            <div className="content">
                {journeys ? journeys.map((journey: IJourneys) => <DestinationCard journey={journey} />) : <Empty />}
            </div>
        </div>
    );
};

export default Journey;
