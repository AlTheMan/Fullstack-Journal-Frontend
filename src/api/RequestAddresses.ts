
export const patientApiAddress = () => {
    // 8081
    //const port = 8081;
    //const address = 'http://localhost:'+ port +'/patient/';
    const address = 'https://patient-api.app.cloud.cbh.kth.se/' + 'patient/'
    return address;

}


export const userApiAddress = () => {
    // 8083
    //const port = 8083;
   //const address = 'http://localhost:'+ port;

    const address = 'https://user-api.app.cloud.cbh.kth.se'

    return address;
}

export const messageApiAddress = () => {

    //8084
    const port = 8084;
    const address = 'http://localhost:'+ port +'/messages';
    //const address = 'https://message-api.app.cloud.cbh.kth.se/' + 'messages'
    return address;
}


export const imageApiAddress = () => {
    const address = 'https://image-api.app.cloud.cbh.kth.se/'
    return address;
}

export const quarkusApiAddress = () => {
    const address = 'https://reactivesearch-api.app.cloud.cbh.kth.se'
    return address;
}