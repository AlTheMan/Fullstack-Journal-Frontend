
export const patientApiAddress = () => {
    // 8081
    //const port = 8081;
    //const address = 'http://localhost:'+ port +'/patient';
    const address = 'https://patient-api.app.cloud.cbh.kth.se/' + 'patient'
    return address;

}


export const userApiAddress = () => {
    // 8083
    //const port = 8083;
    //const address = 'http://localhost:'+ port +'/user';

    const address = 'https://user-api.app.cloud.cbh.kth.se/' + 'user'

    return address;
}

export const messageApiAddress = () => {

    //8082
    //const port = 8082;
    //const address = 'http://localhost:'+ port +'/messages';
    const address = 'https://message-api.app.cloud.cbh.kth.se/' + 'messages'
    return address;
}