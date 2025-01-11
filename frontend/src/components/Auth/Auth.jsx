import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../css/main.css";
import "../../css/Auth.css";

function Auth({ onLogin }) {
    const [showForm, setShowForm] = useState("login");

    const switchForm = (form) => {
        setShowForm(form);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            {showForm === "login" && (
                <>
                    <LoginForm onLogin={onLogin} />
                    <a
                        onClick={() => switchForm("register")}
                        className="mt-3"
                    >
                        Show Register Form
                    </a>
                </>
            )}
            {showForm === "register" && (
                <>
                    <RegisterForm onLogin={onLogin} />
                    <a
                        onClick={() => switchForm("login")}
                        className="mt-3"
                    >
                        Show Login Form
                    </a>
                </>
            )}
        </div>
    );
}

export default Auth;