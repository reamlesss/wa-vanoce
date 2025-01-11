import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/main.css";
import MembersList from "./MembersList";
import "bootstrap/dist/css/bootstrap.min.css";
import Message from "./Message";
import ChatInput from "./ChatInput";

function ChatRoom() {
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState("");
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);

    // Fetch group details and messages
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                // Fetch group name and members
                const groupResponse = await axios.get(`http://localhost:3001/group/${groupId}/details`);
                setGroupName(groupResponse.data.name);
                setMembers(groupResponse.data.members);
                console.log(groupResponse.data.members);

                // Fetch messages
                const messagesResponse = await axios.get(`http://localhost:3001/message/${groupId}/get`);
                setMessages(messagesResponse.data); // This contains sender's username and message
            } catch (err) {
                console.error(err);
                alert("Failed to load group data.");
            }
        };

        fetchGroupData();
    }, [groupId]);

    return (
        <div className="container-fluid d-flex mt-3 justify-content-center">
            {/* Chat Area */}
            <div className="col-9 d-flex flex-column p-3" style={{ minHeight: "100vh" }}>
                <h2 className="text-light mb-3"> {groupName}</h2>
                <div className="flex-grow-1 overflow-auto">
                    {/* Messages */}
                    <div className="d-flex flex-column gap-3 align-items-start">
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                message={msg.message} // Message content
                                sender={msg.username} // Sender's username from the backend
                            />
                        ))}
                    </div>
                </div>

                {/* Input Area */}
                <div className="mt-3">
                    <ChatInput groupId={groupId} setMessages={setMessages} />
                </div>
            </div>

            {/* Members List */}
            <MembersList members={members} />
        </div>
    );
}

export default ChatRoom;