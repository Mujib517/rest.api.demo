//SPeaking javascript
//functions are first class citizen
// functions==objects

// new 

// function fun(a) {
//     console.log("hello",a);
// }

//var obj=new 
//obj.name=

function first() {
    console.log("First is executed");
}

function second(fun) {
    fun();
}

second(first);


// var sum = new Function('a', 'b', 'console.log(a + b)');
// sum(10, 20);

//ES5 Es6
// class Employee {

//     constructor() {
//         this.name = "John";
//         this.age = 25;
//     }

//     display() {
//         console.log(this.name, this.age)
//     }
// }

// var emp = new Employee();
// console.log(emp.name);

// var emp = Object.create({}, {
//     name: { value: 'John', enumerable: true, writable: false, configurable: false },
//     age: { value: 25, enumerable: true, writable: true, configurable: false },
// });

// emp.name = "Mujib";
// emp.age = 32;

// console.log(emp);


// for (var key in emp) {
//     console.log(key);
// }



// function Employee(emp) {
//     this.name = emp;
//     this.age = 25;

//     this.display = function () {
//         console.log(this.name, this.age);
//     }
// }

// var emp = new Employee("John");
// console.log(emp.name);

// var emp2 = new Employee("Joseph");
// console.log(emp2.name);



///reflection

// for (var key in obj) {
//     console.log(key+" "+obj[key]);
// }

