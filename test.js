//third party library. validates cc
function addAsync(a, b, cb) {
    console.log("executing...");
    var prms = new Promise(function (resolve, reject) {
        var c = a + b;
        resolve(c);
    });

    return prms;
}


var prms = addAsync(10, 20);

prms
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    });


prms.then(function (result) {
    console.log("result ", result);
});
