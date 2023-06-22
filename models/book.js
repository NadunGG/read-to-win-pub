const { Schema, model } = require('mongoose');
const { isAlphanumeric } = require('validator');

const bookSchema = new Schema({
  isbn: { type: String, required: true, validate: [isAlphanumeric, 'Only alphanumerics are accepted for ISBN'] },
  category: { type: String, required: true },
  title: { type: String, required: true, validate: [isAlphanumeric, 'Only alphanumerics are accepted for title'] },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
  likeCount: { type: Number, default: 0 },
});

const Book = model('Book', bookSchema);

module.exports = Book;