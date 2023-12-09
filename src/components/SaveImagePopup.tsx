import React from "react";
import "./Components.css";

interface PopupProps {
  isVisible: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textValue: string;
  inputError: string | null;
}

export const Popup: React.FC<PopupProps> = ({
  isVisible,
  onReset,
  onSubmit,
  onTextChange,
  textValue,
  inputError,
}) => {
  if (!isVisible) {
    return;
  }

  return (
    <div className="popup">
      <input
        type="text"
        placeholder="Enter description"
        value={textValue}
        onChange={onTextChange}
        className="popup-input"
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onReset}>Reset</button>
      </div>
      {inputError && (
        <>
          <div style={{ color: "red" }}>{inputError}</div>
        </>
      )}
    </div>
  );
};
