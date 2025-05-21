// Node Modules
const { Router } = require('express');

// Variables
const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Home Page');
});


module.exports = router;