//third party library. validates cc
function addAsync(a, b, cb) {
    console.log("executing...");
    var prms = new Promise(function (resolve, reject) {
        var c = a + b;
        resolve(c);
    });

    return prms;
}


async function main() {
    var result = await addAsync(10, 20);
    console.log(result);
}

main();

