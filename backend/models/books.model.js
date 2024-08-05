const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author:String,
    description:String,
    subdescription:String,
    doiLink:String,
    name:String,
    place:String,
    isbn:String,
    date:String,
},{collection: 'books'});

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;