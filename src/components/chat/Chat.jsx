import React, { useContext, useEffect, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../constants";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";

const Chat = ({ chats }) => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  console.log(socket);
  const [chat, setChat] = useState(null);
  const openChat = async (id, receiver) => {
    setChat(true);
    try {
      const res = await fetch(`${BASE_URL}/chats/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const response = await res.json();
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

    try {
      const resp = await fetch(`${BASE_URL}/messages/${chat.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const res = await resp.json();
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      console.log({
        receiverId: chat.receiver.id,
        data: res.data,
      });
      debugger;
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await fetch(`${BASE_URL}/chats/read/${chat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          // body: JSON.stringify({ text }),
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (socket && chat) {
      console.log("chat", chat);
      socket.on("getMessage", (data) => {
       
        console.log("getMessage:", data);
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((chat) => (
          <div
            className="message"
            key={chat.id}
            onClick={() => openChat(chat.id, chat.user)}
            style={{
              backgroundColor: chat?.seenBy.includes(currentUser.id)
                ? "white"
                : "#fecd514e",
            }}
          >
            <img src={chat?.user?.avatar || "/noavatar.jpg"} alt="" />
            <span>{chat?.user?.name}</span>
            <p>{chat?.lastMessage} </p>
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
              </div>
            ))}

            {/* <div className="chatMessage me">
              <p>Lorem ipsum dolor sit amet </p>
              <span>1 hr</span>
            </div> */}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
