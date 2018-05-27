const express = require('express')
const router = express.Router()
const MainController = require('../controllers/main');

router.post('/send', MainController.visualRecognitionAPI)

module.exports = router;