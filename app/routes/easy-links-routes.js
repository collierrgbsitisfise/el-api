const router = require('express-promise-router')();
const { 
  createEasyLink,
  getEasyLink,
  redirectEasyLinkByHash,
} = require('../controllers/easy-link-controller');

router
  .route('/create-es-link')
  .get(createEasyLink);

router
  .route('/get-es-link/:hash')
  .get(getEasyLink);

router
  .route('/redirect-es-link/:hash')
  .get(redirectEasyLinkByHash);

module.exports = router;
