const express = require('express');
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const db_connection = require('./config/database');
const apiError = require('./utils/api_errors');
const global_error = require('./middlewares/error_middleware');
const category_route = require('./routes/category_route');
dotenv.config({ path: 'config.env' });
const ENV = process.env.NODE_ENV;

// connection with db
db_connection();

//   Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
if (ENV === 'development') {
    app.use(morgan('dev'));
}

// mount Routes
app.use('/api/v1/categories', category_route);
app.all('*', (req, res, next) => {
    next(new apiError(400, `Can't find this route ${req.originalUrl}`));
});
app.use(global_error);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Example app listening on port localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`UnhandledRejection error : ${err}`);
    server.close(() => {
        console.error('shutting down.......');
        process.exit(1);
    });
});
