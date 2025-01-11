import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import { FaUsers } from 'react-icons/fa';
import '../../css/Grouplist.css';

function GroupChatButton(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(props.groupId)
        navigate(`/chatroom/${props.groupId}`);
    };

    return (
        <div
            className="flex-row d-flex gap-5 p-2 rounded-2 shadow-lg groupSelectContainer w-25 justify-content-center align-items-center"
            onClick={handleClick}
            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
        >
            <span className="text-light me-2 ms-3">{props.name}</span>
            <div className="d-flex align-items-center text-light">
                <FaUsers className="me-2" />
                <span className="text-light">{props.count}</span>
            </div>
        </div>
    );
}

export default GroupChatButton;