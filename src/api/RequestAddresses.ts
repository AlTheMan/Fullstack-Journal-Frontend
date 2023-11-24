
export const patientApiAddress = () => {
    // 8081
    const port = 8081;
    const address = 'http://localhost:'+ port +'/patient';

    return address;

}


export const userApiAddress = () => {
    // 8083
    const port = 8083;
    const address = 'http://localhost:'+ port +'/user';
    return address;
}

export const messageApiAddress = () => {

    //8082
    const port = 8082;
    const address = 'http://localhost:'+ port +'/messages';
    return address;
}