const mongoose = require('mongoose');

const bookChapterSchema = new mongoose.Schema({
    authors: String,    
    chapterTitle: String,
    chapterNumber: String,
    bookTitle: String,   
    editors: String,     
    publicationDate: Date,
    doi: String        
}, { collection: 'bookChapters' });

const BookChapter = mongoose.model('BookChapter', bookChapterSchema);

module.exports = BookChapter;
