import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import {
  markChatAsRead,
  openChat,
  sendMessage,
} from "../../services/chatServices";

const Chat = ({ chats }) => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef(null);
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState(""); // State for input value
  const [typingStatus, setTypingStatus] = useState(false); // State for typing status
  const [isTyping, setIsTyping] = useState(false); // state to prevent multiple typing events
  const [onlineUsersClient, setOnlineUsersClient] = useState({});

  const decrease = useNotificationStore((state) => state.decreaseNotifications);

  const openChatHandler = async (id, receiver) => {
    setChat(true);
    try {
      const response = await openChat(id);
      if (!response.data.seenBy.includes(currentUser.id)) {
        decrease(); // Decrease notification count
      }
      setChat({ ...response.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    if (!message) return;

    try {
      const res = await sendMessage(chat.id, text);
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      setMessage(""); // Clear input after sending
      console.log({
        receiverId: chat.receiver.id,
        data: res.data,
      });

      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (socket && chat) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          markChatAsRead(chat.id);
        }
      });
      socket.on("typing", ({ isTyping, senderId }) => {
        const userId = onlineUsersClient[senderId]; // Get userID from socketID
        console.log(userId, chat?.receiver?.id);
        if (userId === chat?.receiver?.id) {
          setTypingStatus(isTyping);
        }
      });
      socket.on("onlineUsers", (users) => {
        setOnlineUsersClient(users);
      });
    }
    return () => {
      socket?.off("getMessage");
      socket?.off("typing");
      socket?.off("onlineUsers");
    };
  }, [socket, chat]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (users) => {
        const userMap = {};
        users.forEach((user) => {
          userMap[user.socketId] = user.userId;
        });
        setOnlineUsersClient(userMap);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0 && !isTyping) {
      socket.emit("typing", { receiverId: chat.receiver.id, isTyping: true });
      setIsTyping(true);
    } else if (e.target.value.length === 0 && isTyping) {
      socket.emit("typing", { receiverId: chat.receiver.id, isTyping: false });
      setIsTyping(false);
    }
  };
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            onClick={() => openChatHandler(c.id, c.user)}
            style={{
              backgroundColor:
                c?.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
          >
            <img src={c?.user?.avatar || "/noavatar.jpg"} alt="" />
            <span>{c?.user?.name}</span>
            <p>{c?.lastMessage} </p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatbox">
          <div className="top">
            <div className="user">
              <img src={chat?.receiver?.avatar || "/noavatar.jpg"} alt="" />
              {chat?.receiver?.name}
            </div>
            <span className="close" onClick={() => setChat(false)}>
              X
            </span>
          </div>
          <div className="center">
            {chat?.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message?.createdAt)}</span>
                {chat && typingStatus && <p>Receiver is typing...</p>}
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea
              name="text"
              value={message}
              onChange={handleInputChange}
            ></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
