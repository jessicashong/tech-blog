const router = require('express').Router();

const loginRoutes = require('/api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);

module.exports = router;