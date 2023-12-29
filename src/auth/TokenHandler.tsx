import { useKeycloak } from "@react-keycloak/web"
import { useEffect } from "react";

const TokenHandler = () : string | undefined => {

    const {keycloak} = useKeycloak();


    useEffect(()=> {
        try {
            keycloak.updateToken(30);
        } catch (error) {
            console.error("Could not update token ", error)
        }
    }, [])

    
    return keycloak.token

}


export default TokenHandler