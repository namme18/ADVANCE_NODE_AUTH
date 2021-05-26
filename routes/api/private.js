const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.get('/users', auth, (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'this is private route!'
    });
});

module.exports = router;