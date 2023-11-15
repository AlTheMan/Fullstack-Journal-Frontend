import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import fetchObservations from "../api/PatientObservationsApi";
import GenericTable from "../components/GenericTable";


const ObservationPage: React.FC = () => {

    const [observations, setObservations] = useState<ObservationCollection | null>(null);

    const id: number = Number(localStorage.getItem("id")) || -1;
    const username: string = String(localStorage.getItem("username") || "");

    if (id === -1 || username.length == 0) return <> Something went wrong.. </>;

    useEffect(() => {
        const loadObservations = async () => {
          const observationData = await fetchObservations(username, id);
          if (observationData) {
            setObservations(observationData);
          }
        };
    
        loadObservations();
      }, []);
    
      if (!observations) {
        return <><NavBar></NavBar>No conditions found</>;
      }

      var observationList = observations.observationDTOs;
    
      for (let index = 0; index < observationList.length; index++) {
        const item = observationList[index];
        item.id = index;
      }



      const columns: TableColumn[] = [
        { id: "description", label: "Description" },
        { id: "value", label: "Value" },
        { id: "unit", label: "Unit" }
      ];
    
      const data: TableData[] = observationList.map((observationList) => ({
        id: observationList.id,
        values: [
          observationList.description,
          observationList.value,
          observationList.unit
        ],
      }));


      return (
        <>
          <NavBar></NavBar>
          <div>
            <h2 style={{padding: "20px"}}>Patient Observations</h2>
          </div>
          <GenericTable columns={columns} data={data}></GenericTable>
        </>
      );

}



export default ObservationPage;