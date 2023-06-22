const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const authorSchema = new Schema({
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/, trim: true },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/, trim: true },
  email: { type: String, required: true, validate: [isEmail, 'Invalid Email'], trim: true },
  contactNo: { type: Number, required: true, maxLength: 10, minLength: 10 },
});

const Author = model('Author', authorSchema);

module.exports = Author;
