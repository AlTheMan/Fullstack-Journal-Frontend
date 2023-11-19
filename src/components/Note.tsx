import React from "react";

interface NoteProps {
    writtenBy: string;
    date: Date;
    note: string;
}


const Note: React.FC<NoteProps> = ({writtenBy, date, note}) => {



    return (
        
        <div className="card text-bg-primary mb-3" style={{width: "12rem"}}>
          <div className="card-body">
            <h5 className="card-title">Note title</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              By: {writtenBy}
            </h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Date: {date.toDateString()}
            </h6>
            <p className="card-text">
              Note: {note}
            </p>
          </div>
        </div>
        

    );


};


export default Note