const express = require('express')
const {get, remove, add, getById, update} = require('./board.controller')
const router = express.Router()

router.get('/', get)
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove)
router.post('/', add);

// this is a comment 

module.exports = router