(async function main() {
    console.log("1");
    setTimeout(() => {
        console.log("2");
        debugger
    }, 1000);
    console.log("3");
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("4");
            debugger
            resolve();
        }, 900);
    });
    console.log("5");
})()
console.log("6");
while (1) {
    console.log("nono");
}