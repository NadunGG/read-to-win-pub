const Author = require('../models/author');
const { eventLogger } = require('../utils/logger');

module.exports.createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNo } = req.body;
    const author = await Author.create({ firstName, lastName, email, contactNo });
    eventLogger.info(`201 - Author Created - ${firstName} ${lastName} - Id: ${author._id}`);
    res.status(201).json(author);
  } catch (err) {
    console.log(err);
    eventLogger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    res.status(500).json({ error: 'Server Error' });
  }
};
