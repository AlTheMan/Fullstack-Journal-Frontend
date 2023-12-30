export const RequestTimer = () =>{
    console.log("In timer")
    const currentTime = Date.now().toString()
    const requestTimer = localStorage.getItem("lastRequestTime")
    if (requestTimer){
        const current = Number(currentTime)
        const lastRequest = Number(requestTimer)
        const difference = current - lastRequest
        console.log("Request available in ", 1 - difference)
        if (difference > 1) {
            localStorage.setItem("lastRequestTime", currentTime)
            return true
        }
    } else {
        localStorage.setItem("lastRequestTime", currentTime)
        return true
    }
    return false;
}