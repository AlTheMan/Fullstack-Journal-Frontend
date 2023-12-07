interface Encounter {
    id: number;
    patient: Patient;
    status: string;
    reason: string;
    priority: string;
    doctor: Doctor;
    date: Date;
}