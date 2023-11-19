import { fetchData } from "../api/namedPersonApi";
import React, { useEffect, useState } from 'react';

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
    </div>
  );
};

export default DoctorHome;

