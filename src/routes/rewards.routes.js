// Node Modules
const { Router } = require('express');

// Variables
const router = Router();
const rewardsController = require('../controllers/rewards.controller');


// Middleware
const isAuthenticated = require('../middlewares/auth.middlware');


/**
 * @swagger
 * tags:
 *   name: Rewards Points
 *   description: Kullanıcı ödül işlemleri
 */

router.get('/', isAuthenticated, rewardsController.rewards);
router.get('/:id', isAuthenticated, rewardsController.rewardsById)

module.exports = router;