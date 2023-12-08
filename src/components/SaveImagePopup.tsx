import React from "react";
import "./Components.css";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textValue: string;
  inputError: string | null;
}

export const Popup: React.FC<PopupProps> = ({
  isVisible,
  onClose,
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
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
      {inputError && (
        <>
          <div style={{ color: "red" }}>{inputError}</div>
        </>
      )}
    </div>
  );
};
