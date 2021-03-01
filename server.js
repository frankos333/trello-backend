const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// const errorHandler = require('./middlewares/errorHandler.middleware')


const boardRoutes = require('./api/board/board.routes')

const app = express()
const http = require('http').createServer(app);

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: `ThIsIsMySeCrETO0`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


// routes
app.use('/api/board', boardRoutes)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;

// app.use(express.static(path.resolve(__dirname, 'public/frontend')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/frontend', 'index.html'));
// });

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// app.use(errorHandler);


http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});

console.log('Aviv was here!');
console.log('Aviv was here2!');