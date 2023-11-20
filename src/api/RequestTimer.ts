export const RequestTimer = () =>{
    console.log("In timer")
    let currentTime = Date.now().toString()
    let requestTimer = localStorage.getItem("lastRequestTime")
    if (requestTimer){
        let current = Number(currentTime)
        let lastRequest = Number(requestTimer)
        let differens = current - lastRequest
        console.log("Request avaliable in ", 30000 - differens)
        if (differens > 30000) {
            localStorage.setItem("lastRequestTime", currentTime)
            return true
        }
    } else {
        localStorage.setItem("lastRequestTime", currentTime)
        return true
    }
    return false;
}