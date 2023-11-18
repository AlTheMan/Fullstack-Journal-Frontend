interface Encounter {
    id: number;
    status: string;
    reason: string;
    priority: string;
    doctors: string[];
}

interface EncounterCollection {
    patientid: Number;
    encounters: Encounter[]
}