function doMyJob(time) {
    return new Promise((resolve, reject) => {
        if (time > 8) {
            reject(new Error("Za długo"))
        } else {
            setTimeout(() => {
                resolve();
                console.log("Jedziemy")
            }, time * 1000);
        }
    })
}


function pay(){
    return new Promise(resolve => resolve())
}

(async () => {

    try {
        await doMyJob(4);
        console.log("zadanie skończone")
        await pay();
        console.log("wypłata poszła")
    } catch(err) {
        console.log("bład")
    }

})()
