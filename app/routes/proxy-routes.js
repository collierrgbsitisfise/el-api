const router = require('express-promise-router')();

const {
  getAllProxy,
} = require('../controllers/proxy');

router
  .route('/')
  .get(getAllProxy);

module.exports = router;
