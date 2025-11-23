import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage, resetConversation } from "../api/api";
import { marked } from "marked";

function ChatWindow() {
  const defaultMessage = [
    {
      role: "assistant",
      content:
        "Hi! I'm your PartSelect assistant. I can help you find parts, diagnose issues, and provide installation guidance. What appliance are you working on?",
    },
  ];

  const [messages, setMessages] = useState(defaultMessage);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Configure marked for better link handling
  useEffect(() => {
    marked.setOptions({
      breaks: true, // Convert \n to <br>
      gfm: true, // GitHub Flavored Markdown
    });
  }, []);

  const handleSend = async (inputText) => {
    if (inputText.trim() !== "" && !isLoading) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: inputText },
      ]);
      setInput("");
      setIsLoading(true);

      try {
        const newMessage = await getAIMessage(inputText);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    resetConversation();
    setMessages(defaultMessage);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <img src="/icon2.png" alt="Assistant" className="assistant-icon" />
          <div className="header-text">
            <div className="assistant-name">PartSelect Assistant</div>
            <div className="assistant-status">Online</div>
          </div>
        </div>
        <button onClick={handleReset} className="reset-btn">
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`${message.role}-message-container`}>
            <div
              className={`message ${message.role}-message ${
                message.isError ? "error-message" : ""
              }`}
            >
              <div
                className="message-content"
                dangerouslySetInnerHTML={{
                  __html: marked(message.content || ""),
                }}
              ></div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="assistant-message-container">
            <div className="message assistant-message loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your issue or ask about a part..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSend(input);
              e.preventDefault();
            }
          }}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={() => handleSend(input)}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;