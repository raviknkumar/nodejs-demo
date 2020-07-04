const Blog = require('../models/blog');

const createForm = (req, res) => {
    res.render('blogs/createblog', {title: 'Create Blog'})
}

const findById = (req, res)=> {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('blogs/details', {blog: result, title: 'Details'});
    }).catch(err => {
        res.render('404', { title: 'Blog not found' });
    });
}

const deleteById =  (req, res) => {
    const id = req.params.id;

    // for an ajax api you can't write direcltly using send or write instead use json
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            })
        }).catch(err => {
            console.error('Error in deleting blog: ', err);
            res.statusCode(500).send(err);
        })
}

const findAll = (req, res) => {
    // createdAt is timestamp added automatically by the mongoose, sort descending
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('blogs/index', {title: 'All Blogs', blogs: result});
        })
        .catch(err => {
            console.error('Error in fetching blogs ', err);
            res.statusCode(500).send(err);
        });
}

const create = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=> {
        res.redirect('/blogs');
    }).catch(err => {
        console.error('Error saving blog data: ', err);
        req.statusCode(500).send(err);
    })
}

module.exports = {
    createForm,
    findById,
    deleteById,
    findAll,
    create
};