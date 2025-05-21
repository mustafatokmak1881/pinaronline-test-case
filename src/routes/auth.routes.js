// Node Modules
const { Router } = require('express');
const router = Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    res.status(200).json({ status: "OK", message: "Access granted"})
});;

module.exports = router;