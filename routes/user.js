const express = require('express');
const router = express.Router();
const {login , register  , getMyProfile , logout} = require('../controllers/user.js');
const {isAuthenticated} = require("../middlewares/auth.js");

router.post('/login' , login);
router.post('/new' , register);
router.get('/logout' , logout);

router.get('/' , (req, res)=>{
    res.json({
        success:true
    })
})

router.get('/me' , isAuthenticated ,  getMyProfile);

module.exports = router;