const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { register, login, getUserDetails } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/get/user',auth, getUserDetails);

module.exports = router;
