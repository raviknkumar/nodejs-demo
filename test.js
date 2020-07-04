const os = require('os');

const greet = (name) => {
    console.log(`Hello ${name}`);
};

//console.log(global);

// current directory
console.log(__dirname);

// current filename
console.log(__filename);

console.log("OS Name ", os.platform(), os.homedir());