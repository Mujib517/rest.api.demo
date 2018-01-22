function arraySum(a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        if (Array.isArray(a[i])) sum += arraySum(a[i]);
        else sum += a[i];
    }
    return sum;
}

function add(a, b) {

    if (typeof a === 'function') a = a();
    if (typeof b === 'function') b = b();

    if (Array.isArray(a)) a = arraySum(a);
    if (Array.isArray(b)) b = arraySum(b);

    console.log(a + b);
}
//ctrl+/
// add(10, 20);
// add("Sheldon", " Cooper");
add([1, 2, [1, [1, [1, 2, 3], 2, 3], 2, 3], 3], [4, 5, 6]);

// add(100, [1, 2, 3, 4]);
// add([1, 2, 3], 200);

// function first() {
//     return 10;
// }

// function second() {
//     return 20;
// }

// add(first, second);
// add(10, 20, 30, 40);
// add(10);
