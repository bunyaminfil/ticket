import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./style.css";
import dayjs from "dayjs";

interface Journey {
    departureTime: string; // Time format (e.g., "09:30")
    arrivalTime: string; // Time format (e.g., "15:30")
    price: string; // Price format (e.g., "75,00 TL")
    route: string; // Route description (e.g., "Esenler Otogarı - Ankara Aşti Otogarı")
}

// Define the props interface for DestinationCard
interface IProps {
    journey: any; // Expect a journey object
}

const DestinationCard: React.FC<IProps> = ({ journey }) => (
    <div className="card">
        <div className="firstColumn">
            <div className="hours">
                <div className="fromHours">
                    <span className="timing">Departure</span>
                    <span className="hour">
                        {journey.journey.departure.split("T")[1].split(":").slice(0, 2).join(":")}
                    </span>
                </div>
                <ArrowRightOutlined className="righticon" />
                <div className="toHours">
                    <span className="timing">Arrival</span>
                    <span className="hour">
                        {journey.journey.arrival.split("T")[1].split(":").slice(0, 2).join(":")}
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
