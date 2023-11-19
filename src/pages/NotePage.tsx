import React, { useState } from "react";

const NotePage: React.FC = () => {
  const maxLength = 255;
  const [text, setText] = useState("");
  const remainingCharacters = maxLength - text.length;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const clearText = () => {
    setText("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "200px",
        }}
      >
        <h1>Enter note</h1>
      </div>

      <div
        className="mx-auto"
        style={{
          backgroundColor: "lightblue",
          margin: "100px",
          padding: "30px",
          width: "400px",
          border: "1px solid black",
        }}
      >
        <form>
          <div className="form-group">
            <label>Note for patient: "Show patient name here"</label>
            <br></br>
            <br />
          </div>
          <div className="form-group">
            <br />
            <textarea
            value={text}
              maxLength={maxLength}
              onChange={handleTextChange}
              id="textarea"
              className="form-control"
              style={{ height: "200px", resize: "none" }}
            ></textarea>
          </div>
          <div style={{ padding: "10px" }}>
            {remainingCharacters} characters remaining.
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            
            <button type="submit">Submit</button>
            <button type="button" onClick={clearText}>Clear</button>
            
          </div>
        </form>
      </div>
    </>
  );
};

export default NotePage;
