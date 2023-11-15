// LoginForm.tsx
import React, { useState } from "react";
import { Link } from 'react-router-dom';

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(message);
  };


  return (
    <>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}></div>
    
      <div className="mx-auto" style={{
        backgroundColor: "lightblue",
        margin: "20px",
        padding: "30px",
        width: "400px",
        border: "1px solid black",
      }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Message: </label>
            <input
              placeholder="Enter message"
              className="form-control"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageForm;
