import React, { useState, useEffect } from "react";
import NameChats from "../components/NameChats.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

function Messages() {
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    useEffect(() => {
        fetchChatList();
    }, []);

    async function fetchChatList() {
        const userId = localStorage.getItem("token id");
        console.log(userId);
        const getChatlist = await fetch('/api/getChats', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${userId}`
            }
        });
        if (getChatlist.ok) {
            const chatsFetched = await getChatlist.json();
            setChatList(chatsFetched);
        }
    }

    const handleChatClick = (chat) => {
        // Set the selected chat
        setSelectedChat(chat);
        console.log("loan Id "+ chat.loanId);
        // Store values in local storage
        localStorage.setItem("selectedChatId", chat.loan_id);
        localStorage.setItem("selectedChatName", chat.other_user_name);
       
        localStorage.setItem("otherUserId", chat.other_user_id)
        localStorage.setItem("id propietario", chat.other_user_id)
    };

    console.log(chatList);
    return (
        <aside className="Chat-Page">
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Chat</h1>
                    </div>
                    <div className="pageLink">
                        <p onClick={() => { window.history.back() }}>Regresar</p>
                    </div>
                </div>
            </div>
            <div className="chat-frame">
                <div className="chats-Container">
                    {chatList.map((chat) => (
                        <NameChats
                            key={chat.loan_id}
                            loanId={chat.loan_id}
                            name={chat.other_user_name}
                            profilePic={chat.other_user_profile_pic}
                            title={chat.libro_titulo}
                           
                            onClick={() => handleChatClick(chat)}
                        />
                    ))}
                </div>
                <div className="chat-Window">
                    {selectedChat && (
                        <ChatWindow
                            name={selectedChat.other_user_name}
                            profilePic={selectedChat.other_user_profile_pic}
                            title={selectedChat.libro_titulo}
                        />
                    )}
                </div>
            </div>
        </aside>
    );
}

export default Messages;