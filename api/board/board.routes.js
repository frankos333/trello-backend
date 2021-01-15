const express = require('express')
const {get, remove, add, getById, edit} = require('./board.controller')
const router = express.Router()

router.get('/', get)
router.get('/:id', getById);
router.put('/:id', edit);
router.delete('/:id', remove)
router.post('/', add);

module.exports = router