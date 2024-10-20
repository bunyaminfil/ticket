import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import DestinationCard from "../../components/DestinationCard";
import { getJourneys } from "../../store/reducers/journeys";
import dayjs from "dayjs";
import { Virtuoso } from "react-virtuoso";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import "./style.css";
import { Empty } from "antd";

const Journey = () => {
    const dispatch = useAppDispatch();
    let [searchParams] = useSearchParams();

    const [{ sessionId, deviceId }] = useLocalStorage<{ sessionId: string; deviceId: string }>("sessions", {
        sessionId: "",
        deviceId: "",
    });

    const { journeys } = useAppSelector((state) => state.journeysReducer);

    /** it is best practice to use url parameters for navigation state */
    const ticketFilterData = useMemo(() => {
        const originId = Number(searchParams.get("originId"));
        const destinationId = Number(searchParams.get("destinationId"));
        const date = searchParams.get("date");
        return {
            "origin-id": originId,
            "destination-id": destinationId,
            "departure-date": date,
        };
    }, [searchParams]);

    const fetchJourneys = async () => {
        if (
            sessionId &&
            deviceId &&
            ticketFilterData["origin-id"] &&
            ticketFilterData["destination-id"] &&
            ticketFilterData["departure-date"]
        ) {
            const payload = {
                "device-session": {
                    "session-id": sessionId,
                    "device-id": deviceId,
                },
                date: ticketFilterData["departure-date"],
                language: "tr-TR",
                data: ticketFilterData,
            };

            await dispatch(getJourneys(payload));
        }
    };
    useEffect(() => {
        fetchJourneys();
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
                    <span className="date">{dayjs(ticketFilterData["departure-date"]).format("D MMMM dddd")}</span>
                </div>
            </div>
            <div className="content">
                {journeys.length === 0 ? (
                    <Empty style={{ marginTop: 20 }} />
                ) : (
                    <Virtuoso
                        totalCount={journeys.length}
                        itemContent={(index) => <DestinationCard key={journeys[index].id} journey={journeys[index]} />}
                    />
                )}
            </div>
        </div>
    );
};

export default Journey;
