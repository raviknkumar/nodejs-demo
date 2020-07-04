const express = require('express');
const { nextTick } = require('process');
const app = express(); // create an express app
const morgan = require('morgan');
const mongoose = require('mongoose')
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

// connect to mongo db
// can use mongo db api for connecting with database
// but will be using mongoose for managing mongo db
let userName = 'ravi'
let password = '1234'
let dbname = 'blog-db'
const dbUrl = `mongodb+srv://${userName}:${password}@cluster0.vusgb.mongodb.net/${dbname}?retryWrites=true&w=majority`

// we don;t want to listen until connection to db is established
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to DB');
    // listen for requests
        app.listen(3000); // infers it as localhost
    })
    .catch(err => {console.error('Error Connecting to DB: ', err)});


// after creating app, register for view engine, app.set is used to edit application settings
// in this case edit view engine 
app.set('view engine', 'ejs');
app.use(morgan('dev')); // formatting the log, use other options like 'tiny'

// to access allowing all public files
// all the files under the folder public are now accessible by browser
app.use(express.static('public'));
// to use the encoded data from every request like body
app.use(express.urlencoded({extended: true}));

// ejs by default looks into views folder for the dynamic views
// is default folder is not getting used, set the views setting
// app.set('views', 'folderName');

// custom middle ware that runs for every request
// we get access to next middleware from the params of the method
/* app.use((req, res, next) => {
    console.log("New Req Made, Host: " , req.hostname,  "For the url: ", req.path); // req.path is same as req.url
    console.log("Method: ", req.method);
    next();
}); */

// routes
// listen for get on url '/about',
app.get('/', (req, res)=> {
    
    // res.write(); 
    // res.end();

    // instead use send method of express, it automatically infers the response sending and sets content Type header 
    // and status automatically
    //res.send('<p>Hello World! </p>');

    // to send a file, use res.sendFile('absolutePath' of file) 
    // in case of relative path, mention where is the releative path from, send an options object, put root as basePath 
    //res.sendFile('./views/home.html', {root: __dirname});

    // with ejs use render
    // the second object used for embedding data into ejs

    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'about'})
});

// handle redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// blog routes
// create blog
// app.use(blogRoutes);
// to mention the basepath for using router, the requestMapping for a router
app.use('/blogs', blogRoutes);
