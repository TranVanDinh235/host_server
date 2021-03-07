require('dotenv').config();
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const config = require('./api/helpers/Config').config;
const house = require('./api/routes/HouseRoutes').router;
const user = require('./api/routes/UserRoutes').router;
const auth = require( './api/routes/AuthRoutes').router;
const trips = require( './api/routes/TripsRoutes').router;

const AuthMiddleware = require('./api/middleware/AuthMiddleware');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use(express.static('photos'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers","*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});


app.use(config.prefix_api + '/auth', auth);
app.use(config.prefix_api + '/house', house);
app.use(config.prefix_api + '/user', user);
app.use(config.prefix_api + '/trips', trips);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(config.server_port);

console.log('API server started on: ' + config.server_port);