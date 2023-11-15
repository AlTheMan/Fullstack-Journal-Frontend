import { fetchData } from "../api/namedPersonApi";
import React, { useEffect, useState } from 'react';
import { NamedPerson } from "../types/NamedPerson";


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
       Welcome {doctor?.firstName} {doctor?.lastName}
    </div>
  );
};

export default DoctorHome;

