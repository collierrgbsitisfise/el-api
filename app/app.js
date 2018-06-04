const express = require('express');
const bodyParser = require('body-parser');

const getConfig = require('./configs');

const app = express();

/* Midalwares */
app.use(bodyParser.json());
app.use('/api/v1/es-link', require('./routes/easy-links-routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  /*eslint-disable */
  console.warn(`Server works on PORT:${PORT}`);
  console.log(getConfig(process.env.NODE_ENV));
});