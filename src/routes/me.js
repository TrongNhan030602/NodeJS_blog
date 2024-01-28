const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeController');

// MeController.index

router.get('/stored/courses', MeController.storedCourses);

module.exports = router;
