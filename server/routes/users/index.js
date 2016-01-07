var router = require('express').Router();
router.get('/', require('./get-users'));
router.get('/get', require('./get-users'));
router.get('/get/:id', require('./get-user'));
module.exports = router;
