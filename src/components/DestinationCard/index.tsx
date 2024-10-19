import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./style.css";

const DestinationCard: React.FC = () => (
    <div className="card">
        <div className="firstColumn">
            <div className="hours">
                <div className="fromHours">
                    <span className="timing">Departure</span>
                    <span className="hour">09:30</span>
                </div>
                <ArrowRightOutlined className="righticon" />
                <div className="toHours">
                    <span className="timing">Arrival</span>
                    <span className="hour">15:30</span>
                </div>
            </div>
            <div className="action">
                <Button>75,00 TL</Button>
            </div>
        </div>
        <div className="secondColumn">Esenler Otogarı - Ankara Aşti Otogarı</div>
    </div>
);

export default DestinationCard;
