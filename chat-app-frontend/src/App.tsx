import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

const WS_URL = "http://localhost:3002";
const BASE_URL = "http://localhost:3002";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { username: string; text: string; image?: string }[]
  >([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isLoggedIn && username) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3002/chat/messages`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      socketRef.current = io(WS_URL, {
        transports: ["websocket"],
        query: { username },
      });

      socketRef.current.on(
        "newMessage",
        (data: { username: string; text: string; image?: string }) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { username: data.username, text: data.text, image: data.image },
          ]);
        }
      );

      return () => {
        socketRef.current.off("newMessage");
      };
    }
  }, [isLoggedIn, username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image || message.trim()) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("text", message);
        if (image) {
          formData.append("image", image);
        }

        const response = await axios.post(
          "http://localhost:3002/chat/create-message",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMessage("");
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const Avatar = ({ name }: { name: string }) => (
    <div className="avatar">{name?.charAt(0)?.toUpperCase()}</div>
  );

  if (!isLoggedIn) {
    return (
      <div className="App">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button type="submit">Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>Chat Room</h1>
      <div className="App">
        <div
          className="chat-messages"
          style={{ maxHeight: "85vh", overflowY: "auto" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.username === username ? "self-message" : "normal-message"
              }`}
            >
              <div className="username">{msg.username}</div>
              <div className="message-content">
                {msg.image && (
                  <img
                    src={`${BASE_URL}/file/get-file/${msg.image}`}
                    alt="User uploaded"
                    className="message-image"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                )}
                {msg.text && <div className="text">{msg.text}</div>}
              </div>
            </div>
          ))}
          <div className="image-message">
            {imagePreview && (
              <div className="image-preview ">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="clear-img-button"
                >
                  X
                </button>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Form to send message */}
        <form onSubmit={handleSendMessage} className="message-form">
          <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-input"
              ref={fileInputRef}
            />
            <label htmlFor="file-input" className="file-input-label">
              <i className="fa-solid fa-image image-icon"></i>
            </label>
            <button type="submit" className="send-icon">
              <i className="fa-regular fa-paper-plane "></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
