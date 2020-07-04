/**
 * http server without express
 */

const http = require('http');
const fs = require('fs');

// create a http server
// req is http request and res is http response
// req object has attributes like url, method
const server = http.createServer((req, res) => {
    // entry point of every request
    console.log("Req Made");

    let viewsFileUrl = './views/'
    switch(req.url){
        case '/' : 
        case'/home':
            viewsFileUrl += '/home.html';
            break;
        case '/about':
            viewsFileUrl += '/about.html';
            break;
        case '/about-me':
            res.setHeader('Location', '/about'); // redirecting to url using server
            res.statusCode = 301; // moved to somewhere else
            res.end();
            break;
        default:
            viewsFileUrl += '404.html';
            break;            
    }

    fs.readFile(viewsFileUrl, (err, file) => {
        if(err){
            console.log("Error ", err);
            res.end();
        } else{
            res.statusCode = 200;
            res.end(file);
        }
    })
});

// server is created, but not bind to any port for listening requests
// binding to port to listen requests

// by default the second argument is localhost
server.listen(3000 , 'localhost', () => {
    // success
    console.log("Server listening on port 3000");
});