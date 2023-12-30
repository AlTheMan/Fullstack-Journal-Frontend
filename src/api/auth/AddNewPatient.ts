import axios from "axios";
import {patientApiAddress, userApiAddress} from "../RequestAddresses.ts";

export const addNewPatient = async (
    newPatient: NewPatientProps,
    token: string | undefined
): Promise<ReturnedPatientProps | null> => {
    try {

        const userId = newPatient.userId
        const firstName = newPatient.firstName
        const lastName = newPatient.lastName
        const sex = newPatient.sex
        const birthdate = newPatient.birthdate

        const addedPatient = await axios.post(patientApiAddress() + 'add', {
            userId, firstName, lastName, sex, birthdate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (addedPatient.status === 200) {
            console.log(addedPatient.data);

            const data: ReturnedPatientProps = addedPatient.data;
            const personId = data.id

            const addedUser = await axios.post(userApiAddress() + '/add', {
                userId, personId, firstName, lastName, privilege: 'PATIENT'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (addedUser.status !== 200){
                console.error("Failed to add user")
                return null
            }

            return addedPatient.data
        } else {
            console.error("Failed to fetch patient id from user name:", addedPatient.status);
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching patient id from username', error)
        return null
    }
}