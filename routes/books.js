const express = require('express');
const router = express.Router();
const { createBook, findBookByISBN, incrementBookLikes } = require('../controllers/books');

router.post('/', createBook);

router.get('/:isbn', findBookByISBN);

router.put('/:id/like', incrementBookLikes);

module.exports = router;
