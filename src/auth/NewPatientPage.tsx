//RegisterPage.tsx

import NewPatientForm from "./NewPatientForm";
import React, { useEffect } from "react";

interface NewPatientPageProps {
  userId: string;
  firstName: string;
  lastName: string;
  submitNewPatient: (newPatient: NewPatientProps) => Promise<void>
}

const NewPatientPage: React.FC<NewPatientPageProps> = ({
  userId,
  firstName,
  lastName,
  submitNewPatient
}) => {
    console.log("New patient page"); // this still doesnt print
    //const navigate = useNavigate();


  useEffect(() => {
    console.log("In form"); // this still doesnt print
  }, [])

  const handleRegisterFormSubmit = async (
    birthdate: string,
    sex: "MALE" | "FEMALE"
  ) => {
    // Define the data to be sent in the request body
    const requestData: NewPatientProps = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      birthdate: birthdate,
    };
    submitNewPatient(requestData)
  };

 

  return (
    <>
      <div>
        <NewPatientForm onSubmit={handleRegisterFormSubmit}></NewPatientForm>
      </div>
    </>
  );
};

export default NewPatientPage;
