const router = require('express-promise-router')();

const {
  redirectEasyLinkByHash,
} = require('../controllers/easy-link-controller');


router
  .route('/:hash')
  .get(redirectEasyLinkByHash);

module.exports = router;
