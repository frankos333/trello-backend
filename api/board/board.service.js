const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_NAME = 'board'

const query = async (filterBy = {}) => {

    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const boards = await collection.find({$or: [{'members._id': filterBy.userId}, {'isPublic': true}]}).sort({'createdAt': -1}).toArray();
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}
const getById = async (id) => {

    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const board = await collection.findOne({'_id': ObjectId(id)})
        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${id}`)
        throw err;
    }
}
const remove = async (id) => {

    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({"_id": ObjectId(id)})
    } catch (err) {
        console.log(`ERROR: cannot remove board ${id}`)
        throw err;
    }
}

const update = async (board) => {

    const collection = await dbService.getCollection(COLLECTION_NAME)
    board._id = ObjectId(board._id);
    try {
        await collection.replaceOne({"_id": board._id}, {$set: board})
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }

}

const add = async (board) => {

    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}
