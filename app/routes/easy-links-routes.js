const router = require('express-promise-router')();
const { getEasyLink } = require('../controllers/easy-link-controller');

router
  .route('/create-es-link')
  .get(getEasyLink);

module.exports = router;
