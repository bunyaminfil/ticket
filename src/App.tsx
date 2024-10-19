import React from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import "./App.css";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/journey" element={<Journey />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
