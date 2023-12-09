import React from "react";
import "./Components.css";

interface PopupProps {
  onClose: () => void;
  textValue: string;
  isVisible: boolean
}

export const InformationPopup: React.FC<PopupProps> = ({
  onClose,
  textValue,
  isVisible
}) => {
  if (!isVisible) {
    return;
  }

  return (
    <div className="popup">
        <div>
            {textValue}
        </div>
      <button onClick={onClose}>Ok</button>
    </div>
  );
};
