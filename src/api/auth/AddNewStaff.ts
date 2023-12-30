import axios from "axios";
import {patientApiAddress, userApiAddress} from "../RequestAddresses.ts";

export const addNewStaff = async (
    firstName: string,
    lastName: string,
    userId: string,
    privilege: string,
    token: string | undefined

): Promise<ReturnedStaffProps | null> => {
    try {
        const addedStaff = await axios.post(patientApiAddress() + '/add-staff', {
            firstName, lastName, privilege, userId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (addedStaff.status === 200) {
            console.log(addedStaff.data);

            const data: ReturnedStaffProps = addedStaff.data;
            const personId = data.id

            const addedUser = await axios.post(userApiAddress() + '/add', {
                userId, personId, firstName, lastName, privilege
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (addedUser.status !== 200){
                console.error("Failed to add user")
                return null
            }

            return addedStaff.data
        } else {
            console.error("Failed to fetch patient id from user name:", addedStaff.status);
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching patient id from username', error)
        return null
    }
};