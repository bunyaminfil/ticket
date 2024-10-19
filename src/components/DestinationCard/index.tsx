import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { IJourneys } from "../../app/types/journeyTypes";
import "./style.css";

interface IProps {
    journey: IJourneys;
}

const DestinationCard: React.FC<IProps> = ({ journey }) => (
    <div className="card">
        <div className="firstColumn">
            <div className="hours">
                <div className="fromHours">
                    <span className="timing">Departure</span>
                    <span className="hour">
                        {journey.journey.departure?.split("T")[1].split(":").slice(0, 2).join(":")}
                    </span>
                </div>
                <ArrowRightOutlined className="righticon" />
                <div className="toHours">
                    <span className="timing">Arrival</span>
                    <span className="hour">
                        {journey.journey.arrival?.split("T")[1].split(":").slice(0, 2).join(":")}
                    </span>
                </div>
            </div>
            <div className="action">
                <Button>{journey.journey["original-price"] + " " + journey.journey.currency}</Button>
            </div>
        </div>
        <div className="secondColumn">
            {journey.journey.origin} - {journey.journey.destination}
        </div>
    </div>
);

export default DestinationCard;
