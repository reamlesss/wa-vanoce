import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';
import GroupChatButton from './GroupChatButton';
import { FaPlus } from 'react-icons/fa';

function ChatGroupChoice() {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3001/group/all');
                setGroups(response.data); // Assuming response.data is an array of groups with id and name.
            } catch (err) {
                console.error(err);
                alert('Failed to load groups.');
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 flex-column gap-3 groupListContainer">
            <h1 className="text-center text-light mb-3">Join or create a group chat</h1>
            {groups.map((group) => (
                <GroupChatButton
                    key={group.id}
                    groupId={group.id} // Pass groupId here
                    name={group.name}
                    count={group.memberCount || "0"} // Assuming there's a member count or defaulting to 0
                />
            ))}
            <button
                className="btn-secondary w-25 p-1 fs-5"
                onClick={() => navigate('/create-group')}
            >
                <FaPlus className="text-light" />
            </button>
        </div>
    );
}

export default ChatGroupChoice;