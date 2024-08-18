const mongoose = require('mongoose');

const bookChapterSchema = new mongoose.Schema({
    authors: String,    
    description: String,
    subdescription: String,
    name: String,   
    place: String,     
    isbn: String,
    date: Date,
    doiLink: String      
}, { collection: 'bookChapters' });

const BookChapter = mongoose.model('BookChapter', bookChapterSchema);

module.exports = BookChapter;
