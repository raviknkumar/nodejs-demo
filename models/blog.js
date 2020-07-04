const mongoose = require('mongoose');
const Schema = mongoose.Schema; // class name, Schema starts with capital letetr

// create schema
// pass object that describes the structure of the model (collection)
// second object is options
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// in options, timestamps will automatically set the time stamps on the document (createdAt, updatedAt) and autoAssign them

// create a model
// model names are similar to classnames and start with capital letters
// first argument is name and it pluralizes the name and looks for this name in the db
// second argument is type of objects that are stored in collection
const Blog = mongoose.model('blog', blogSchema);

// export it
module.exports = Blog;