import React, { useState } from "react";

interface ClickPopupButtonProps {
  doctorList: Doctor[];
}

interface Doctor {
  prefix: string;
  firstName: string;
  lastName: string;
}

interface ClickPopupButtonProps {
  doctorList: Doctor[];
}

const ClickPopupButton: React.FC<ClickPopupButtonProps> = ({ doctorList }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <button onClick={togglePopup}>View</button>
      {isPopupVisible && (
        <div className="popup">
          <ul>
            {doctorList.map((doctor: Doctor, index: number) => (
              <li key={index}>{doctor.prefix}: {doctor.firstName} {doctor.lastName}</li> // Access the appropriate property
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClickPopupButton;
