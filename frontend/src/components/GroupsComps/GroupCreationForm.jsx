import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/main.css";
import "../../css/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GroupCreationForm() {
    const [groupName, setGroupName] = useState("");
    const [allowedUsernames, setAllowedUsernames] = useState("");
    const [isPrivate, setIsPrivate] = useState(false); // Toggle for showing the second input field
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/group/create", {
                name: groupName,
                allowedUsernames: isPrivate && allowedUsernames
                    ? allowedUsernames.split(",").map((u) => u.trim())
                    : [] // Empty array for open groups
            });
            const groupId = response.data.groupId; // Assuming the backend returns the created group ID
            alert(response.data.message);
            navigate(`/chatroom/${groupId}`);
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="bg-primary p-5 rounded-5 w-50" onSubmit={handleSubmit}>
                <h1 className="text-light text-center">Create Group</h1>

                <div className="mb-3">
                    <label htmlFor="groupName" className="form-label text-light">
                        Group Name
                    </label>
                    <input
                        type="text"
                        className="form-control p-2"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <button
                        type="button"
                        className={`btn ${isPrivate ? "btn-secondary" : "btn-secondary"} w-100 mb-3`}
                        onClick={() => setIsPrivate(!isPrivate)}
                    >
                        {isPrivate ? "Public" : "Private"}
                    </button>
                </div>

                {isPrivate && (
                    <div className="mb-3">
                        <label htmlFor="allowedUsernames" className="form-label text-light">
                            Allowed Usernames (comma-separated)
                        </label>
                        <input
                            type="text"
                            className="form-control p-2"
                            id="allowedUsernames"
                            value={allowedUsernames}
                            onChange={(e) => setAllowedUsernames(e.target.value)}
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                    Create Group
                </button>
            </form>
        </div>
    );
}

export default GroupCreationForm;