import {useEffect, useState} from "react";
import TokenHandler from "../../auth/UseTokenHandler.tsx";
import axios from "axios";
import {userApiAddress} from "../RequestAddresses.ts";

export const useFetchStaffData = (personId: number) => {
    const [staff, setStaff] = useState<ReturnedStaffProps | null>(null);
    const token = TokenHandler();

    useEffect(() => {
        if (personId === -1) return
        const fetchStaffData = async () => {
            try {
                const response = await axios.get(userApiAddress() + '/get-by-personId', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }, params: {
                        personId: personId
                    }
                });
                if (response.status === 200) {
                    setStaff(response.data)
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchStaffData();
    }, [personId, token]);
    return staff;
}