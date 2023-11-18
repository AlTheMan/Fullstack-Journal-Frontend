import { useEffect, useState } from "react";
import fetchEncounters from "../api/PatientEncountersApi";
import NavBar from "../components/Navbar";

const EncounterPage: React.FC = () => {
  const [encounters, setEncounters] = useState<EncounterCollection | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const id: number = Number(localStorage.getItem("id")) || -1;
    const username: string = String(localStorage.getItem("username") || null);

    if (id === -1 || username.length === 0) {
        setError('Invalid ID or Username');
        return;
      }

      const loadEncounters = async () => {
        setLoading(true);
        try {
            const encounterData = await fetchEncounters(username, id);
            if (encounterData) {
                setEncounters(encounterData)
            } else {
                setError("Data not found");
            }

        } catch (error){
            setError("An error occured while fetching data");
        } finally {
            setLoading(false);
        }
      };

      loadEncounters();


  }, []);


  if (error) return (<>Error</>)
  if(loading || encounters === null) {
    return (
        <><div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
      </>);
  }



  return (
    <>
      <NavBar></NavBar>
    </>
  );
};

export default EncounterPage;
