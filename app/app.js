const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const getConfig = require('./configs');

const envConfigs = getConfig(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(envConfigs.mongoConnectionUrl);

/* Midalwares */

// statics www files
app.use(express.static(path.join(__dirname, 'www')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// CROS ORIGIN REQUEST ALLOW
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1/es-link', require('./routes/easy-links-routes'));
app.use('/api/v1/proxy', require('./routes/proxy-routes'));


/* use it only for redirect route */
app.use('/', require('./routes/special-links-routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  /*eslint-disable */
  console.warn(`Server works on PORT:${PORT}`);
  console.log(getConfig(process.env.NODE_ENV));
});