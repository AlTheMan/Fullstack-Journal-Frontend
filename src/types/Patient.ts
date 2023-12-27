// Patient

interface Patient  {
    id: number;
    firstName: string;
    lastName: string;
    sex: string;
    birthdate: Date;
};

interface ReturnedPatientProps {
    id: number,
    userId: string,
    firstName: string,
    lastName: string,
    sex: string,
    birthdate: string
}

interface NewPatientProps {
    userId: string,
    firstName: string,
    lastName: string,
    sex: string,
    birthdate: string
  }