interface Encounter {
    id: number;
    status: string;
    reason: string;
    priority: string;
    doctors: Doctor[];
}

interface EncounterCollection {
    patientid: Number;
    encounters: Encounter[]
}