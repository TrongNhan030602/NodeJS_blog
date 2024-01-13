const express = require('express')
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.use('/search', siteController.search);
router.use('/', siteController.index); // Nam duoi cung

module.exports = router;