const router = require('express-promise-router')();
const { createEasyLink, getEasyLink } = require('../controllers/easy-link-controller');

router
  .route('/create-es-link')
  .get(createEasyLink);

router
  .route('/get-es-link/:hash')
  .get(getEasyLink);

module.exports = router;
