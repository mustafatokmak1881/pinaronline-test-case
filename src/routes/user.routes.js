// Node Modules
const { Router } = require('express');

// Variables
const router = Router();
const userController = require('../controllers/user.controller')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Kullanıcı kayıt, kimlik doğrulama işlemleri
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           example: kullanici123
 *         email:
 *           type: string
 *           format: email
 *           example: ornek@mail.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: Sifre123!
 *       example:
 *         username: kullanici123
 *         email: ornek@mail.com
 *         password: Sifre123!
 * 
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: kullanici123
 *         email:
 *           type: string
 *           example: ornek@mail.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-20T14:30:00Z"
 *     LoginInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: kullanici123
 *         password:
 *           type: string
 *           example: Sifre123!
 *       example:
 *         username: kullanici123
 *         password: Sifre123!
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             username:
 *               type: string
 *               example: kullanici123
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Geçersiz giriş bilgileri
 *       409:
 *         description: Kullanıcı zaten mevcut
 */
router.post('/register', userController.create);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Kullanıcı girişi ve JWT token alımı
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Başarılı giriş. JWT token döner.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Geçersiz kimlik bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Invalid username or password
 */
router.post('/login', userController.login)
router.post('/delete', userController.delete); // This is for only testing. I know this is no at given task.


module.exports = router;