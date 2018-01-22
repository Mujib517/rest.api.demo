var obj = {
    name: "John",
    age: 25,
    display: function () {
        console.log(this.name + " is " + this.age + " years old");
    },
    'my property': "my value"
};

var obj2={
    name: "Joseph",
    age: 25,
    display: function () {
        console.log(this.name + " is " + this.age + " years old");
    },
    'my property': "my value"
}



///reflection

// for (var key in obj) {
//     console.log(key+" "+obj[key]);
// }

