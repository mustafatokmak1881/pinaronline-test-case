// Node Modules
const { Router } = require('express');

// Variables
const router = Router();
const pointsController = require('../controllers/points.controller')

// Middleware
const isAuthenticated = require('../middlewares/auth.middlware');

/**
 * @swagger
 * tags:
 *   name: User Points
 *   description: Kullanıcı puan işlemleri
 */

router.post('/earn', isAuthenticated, pointsController.earn);


module.exports = router;