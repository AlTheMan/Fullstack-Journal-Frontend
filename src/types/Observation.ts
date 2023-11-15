
interface Observation {
    id: number;
    description: string;
    value: number;
    unit: string;
}

interface ObservationCollection {
    patientId: number;
    observationDTOs: Observation[];
}


