const express = require('express');
const app = express();
const mongoose = require('mongoose');

// add blog to db
app.get('/add-blog', (req, res) => {
    
    // create a new instance of model to save the data
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'About my new blog',
        body: 'More about my new blog'
    });
    
    blog.save()
        .then((result)=> {
            res.send(result);
        })
        .catch(err=> {
            console.error('Error in storing the blog to db', err);
            res.statusCode(500).send(err);
        });
});

// get all from db
app.get('/blogs', (req, res) => {
    
    // gives all documents
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch(err=> {
            console.error('Error in getting blogs: ', err);
            res.statusCode(500).send(err);
        });
});

// find by id 
app.get('/single-blog', (req, res) => {
    
    // gives all documents
    Blog.findById('5eff964922263a0fa9d849d4')
        .then((result)=>{
            res.send(result)
        })
        .catch(err=> {
            console.error('Error in getting blogs: ', err);
            res.statusCode(500).send(err);
        });
});