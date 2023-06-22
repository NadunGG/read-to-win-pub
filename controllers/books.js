const Author = require('../models/author');
const Book = require('../models/book');
const { eventLogger } = require('../utils/logger');

module.exports.createBook = async (req, res) => {
  try {
    const { isbn, category, title, authorId } = req.body;
    const author = await Author.findById(authorId);
    if (!author) {
      eventLogger.error(`404 - Author Not Found - Id: ${authorId}`);
      return res.status(404).json({ error: 'Author Not Found' });
    }
    const book = await Book.create({ isbn, category, title, author });
    eventLogger.info(`201 - Book Created - ${title} - Id: ${book._id}`);
    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    eventLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.status(500).json({ error: 'Server Error' });
  }
};
module.exports.findBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate('author');
    if (!book) {
      eventLogger.error(`404 - Book Not Found - ISBN: ${req.params.isbn}`);
      return res.status(404).json({ error: 'Book Not Found' });
    }
    eventLogger.info(`200 - Book Query Successful - ${book._id}`);
    res.json(book);
  } catch (err) {
    console.log(err);
    eventLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.status(500).json({ error: 'Server Error' });
  }
};
module.exports.incrementBookLikes = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      eventLogger.error(`404 - Book Not Found - Id: ${req.params.id}`);
      return res.status(404).json({ error: 'Book Not Found' });
    }
    book.likeCount++;
    await book.save();
    eventLogger.info(`200 - User Liked a Book - BookId: ${book._id}`);
    res.json(book);
  } catch (err) {
    console.log(err);
    eventLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.status(500).json({ error: 'Server Error' });
  }
};
