var f1 = require('./file1');

// doing selective import, variable names must be same as keys used during export
var {arr, agesOfUsers} = require('./file1');

console.log("Hello");
console.log(arr, agesOfUsers);