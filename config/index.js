let config;

// config = require('./prod')
config = require ('./dev')
// if (process.env.NODE_ENV === 'production') config = require('./prod')
// else config = require('./dev')

module.exports = config