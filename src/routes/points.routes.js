// Node Modules
const { Router } = require('express');

// Variables
const router = Router();
const pointsController = require('../controllers/points.controller');
const usersBankController = require('../controllers/usersBank.controller');

// Middleware
const isAuthenticated = require('../middlewares/auth.middlware');


/**
 * @swagger
 * tags:
 *   name: User Points
 *   description: Kullanıcı puan işlemleri
 */

router.post('/earn', isAuthenticated, pointsController.earn);
router.get('/history', isAuthenticated, pointsController.history);
router.get('/balance', isAuthenticated, usersBankController.balance)

module.exports = router;