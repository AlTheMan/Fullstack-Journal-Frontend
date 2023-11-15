
interface Condition {
    id: number
    clinicalStatus: string;
    verificationStatus: string;
    category: string;
    severity: string;
    code: string;
    bodySite: string;
    evidence: string;
}

interface ConditionCollection {
    patientId: number;
    conditionDTOS: Condition[];
}