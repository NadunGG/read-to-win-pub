const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./mongoDB');
const cron = require('node-cron');
const { authorLikesLogger, eventLogger } = require('./utils/logger');
const Author = require('./models/author');
const Book = require('./models/book');

const app = express();
const port = 5000;

const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');


// MongoDB Connection
mongoDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

// Scheduled Task (Runs every 5 minutes)
cron.schedule('*/5 * * * *', async () => {
  try {
    const authors = await Author.find();
    let report = '\n';
    for (const author of authors) {
      const books = await Book.find({ author: author._id });
      const likeCount = books.reduce((total, book) => total + book.likeCount, 0);
      report += `Author: ${author.firstName} ${author.lastName} - Like Count: ${likeCount}\n`;
    }
    authorLikesLogger.info(`${report}\n`);
    eventLogger.info(`201 - Log Created: Author Likes Count`);
  } catch (err) {
    eventLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message || 'Couldn\'t Generate Scheduled Report'} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    console.log(err);
  }
});

// Listening on Port 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  eventLogger.info(`Server Started on http://localhost/${port}`);
});
