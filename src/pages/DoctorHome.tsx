import { fetchData } from "../api/NamedPersonApi";
import React, { useEffect, useState } from 'react';
import { NamedPerson } from "../types/NamedPerson";
import Button from '../components/Button';
import { Link } from 'react-router-dom';


const DoctorHome: React.FC = () => {

    const [doctor, setDoctor] = useState<NamedPerson | null>(null);

  const id: number = Number(localStorage.getItem("id")) || -1;
  
  useEffect(() => {
    const loadDoctor = async () => {
      const doctorData = await fetchData(id);
      if (doctorData) {
        setDoctor(doctorData)
      }
    };

    loadDoctor();
  }, []);

return (
    <div>
       <h1>Welcome: Dr {doctor?.firstName} {doctor?.lastName}</h1>
       <Link to="/NotePage" className="nav-link">
          <Button onClick={() => console.log("clicked")}>Add note</Button>
       </Link>
      
    </div>
  );
};

export default DoctorHome;

