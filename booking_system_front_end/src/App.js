import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import Register from "./components/Register";
import EventsList from './components/EventsList';
import CreateEventPage from './components/CreateEventPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<EventsList />} />
                <Route path="/create-event" element={<CreateEventPage />} />
            </Routes>
        </Router>
    );
}

export default App;
