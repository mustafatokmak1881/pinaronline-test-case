// Node modules
const { Router } = require('express');

// Variable
const router = Router();

router.use((req, res, next) => {
    res.status(404).send(`NOT_FOUND`);
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(`Server Error`);
})

module.exports = router;