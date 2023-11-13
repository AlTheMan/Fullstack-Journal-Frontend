// LoginForm.tsx
import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };


  return (
    <>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "200px"}}><h1>Algots Sjukstuga</h1></div>
    
      <div className="mx-auto" style={{
        backgroundColor: "lightgray",
        margin: "100px",
        padding: "30px",
        width: "400px",
        border: "1px solid black",
      }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address: </label>
            <input
              placeholder="Enter email"
              className="form-control"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              placeholder="Enter password"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
