import {useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';

const useTokenHandler = () => {
    const {keycloak} = useKeycloak(); // this is a hook
    const [token, setToken] = useState<string | undefined>(keycloak.token);

    useEffect(() => {
        const updateToken = async () => {
            try {
                const refreshed = await keycloak.updateToken(30);
                if (refreshed) {
                    setToken(keycloak.token);
                }
            } catch (error) {
                console.error("Could not update token", error);
            }
        };

        updateToken();
    },[]);

    return token;
};

export default useTokenHandler;
