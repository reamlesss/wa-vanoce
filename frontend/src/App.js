import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ChatGroupChoice from "./components/GroupsComps/ChatGroupChoice";
import GroupCreationForm from "./components/GroupsComps/GroupCreationForm";
import ChatRoom from "./components/ChatComponents/ChatRoom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? <ChatGroupChoice /> : <Auth onLogin={handleLogin} />}
                />
                <Route path="/create-group" element={<GroupCreationForm />} />
                <Route path="/chatroom/:groupId" element={<ChatRoom />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;