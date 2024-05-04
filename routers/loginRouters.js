const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login/loginController');

router.get('/',loginController.getlogin);
router.post('/auth',loginController.setloginusuario);
router.post('/register',loginController.setregistrarusuario);

module.exports = router;