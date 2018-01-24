function addAsync(a, b, cb) {
    console.log("Started...");

    function myCallback() {
        console.log("Calculating");
        var c = a + b;
        cb(c, 1000);
    }

    //db,file,web service, setTimeout
    setTimeout(myCallback, 2000);

    console.log("Ended");
    return undefined;
}

addAsync(20, 30, function callback(result, result2) {
    console.log(result, result2);
});


// function add(a, b) {
//     a++;
//     b++;
//     a = a + 2;

//     return a + b;
// }

// add(10, 20);