import React from 'react';

interface TwoRadioButtonsProps {
    firstButtonName: string,
    seconButtonName: string,
    activeButton: boolean
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const TwoRadioButtons: React.FC<TwoRadioButtonsProps> = ({
    firstButtonName,
    seconButtonName,
    handleOptionChange,
    activeButton
}) => {
  
  return (
    <div className='popup'>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="radio" 
          name="flexRadioDefault" 
          id="firstButton" 
          onChange={handleOptionChange} 
          checked={activeButton} 
        />
        <label className="form-check-label" htmlFor="secondButton">
          {firstButtonName}
        </label>
      </div>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="radio" 
          name="flexRadioDefault" 
          id="secondButton" 
          onChange={handleOptionChange} 
          checked={!activeButton} 
        />
        <label className="form-check-label" htmlFor="secondButton">
          {seconButtonName}
        </label>
      </div>
    </div>
  );
};

export default TwoRadioButtons;
