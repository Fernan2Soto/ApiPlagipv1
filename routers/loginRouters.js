const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login/loginController');

router.post('/login',loginController.setloginusuario);
router.post('/registrar',loginController.setregistrarusuario);

module.exports = router;