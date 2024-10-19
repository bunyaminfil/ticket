import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DestinationCard from "../../components/DestinationCard";
import "./style.css";

const Home = () => {
    return (
        <div className="journey">
            <div className="header">
                <div className="icon">
                    <Link to="/">
                        <ArrowLeftOutlined style={{ color: "white" }} />
                    </Link>
                </div>
                <div className="header-center">
                    <span className="states">İstanbul Avrupa - Ankara</span>
                    <span className="date">25 Ekim Perşembe</span>
                </div>
            </div>
            <div className="content">
                <DestinationCard />
                <DestinationCard />
                <DestinationCard />
                <DestinationCard />
                <DestinationCard />
                <DestinationCard />
            </div>
        </div>
    );
};

export default Home;
