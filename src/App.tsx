import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Journey from "./pages/Journey";

import "./App.css";

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
