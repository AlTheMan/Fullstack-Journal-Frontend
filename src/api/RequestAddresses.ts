
export const patientApiAddress = () => {
    const port = 8080;
    const address = 'http://localhost:'+ port +'/patient';

    return address;

}


export const userApiAddress = () => {
    const port = 8083;
    const address = 'http://localhost:'+ port +'/user';
    return address;
}

export const messageApiAddress = () => {
    const port = 8082;
    const address = 'http://localhost:'+ port +'/messages';
    return address;
}