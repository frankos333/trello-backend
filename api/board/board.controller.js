const logger = require('../../services/logger.service')
const boardService = require('./board.service')

const get = async (req, res) => {
    const boards = await boardService.query(req.query)
    logger.debug(boards);
    res.send(boards)
}
const getById = async (req, res) => {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}

const add = async (req, res) => {
    let board = req.body
    board = await boardService.add(board)
    res.send(board)
}

const remove = async (req, res) => {
    await boardService.remove(req.params.id)
    res.end()
}

const update = async (req, res) => {
    const board = req.body;
    await boardService.update(board)
    res.send(board)
}


module.exports = {
    get,
    getById,
    add,
    remove,
    update,
}