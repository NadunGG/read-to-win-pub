const express = require('express');
const router = express.Router();
const { createAuthor } = require('../controllers/authors');

router.post('/', createAuthor);

module.exports = router;
