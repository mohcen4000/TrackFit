"use client";
/// MessagePage.js
import React, { useState, useEffect } from "react";
import Title from "@/app/Components/Head";
import Sidebar from "@/app/Components/Sidebar";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/getMessages"); // Updated API route
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data); // Setting messages directly, no need to parse JSON again
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);
  return (
    <div className="splitter">
      <Title />
      <Sidebar />
      <main>
        <div className="container-messages ">
          <h1>Messages</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="messages-box">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  <p>Email Sender: {message.sender}</p>
                  <p>Message: {message.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
