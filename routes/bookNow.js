var express = require('express');
var router = express.Router();
//var conn = require('./connection');


router.get('/', function (req, res, next) {
    res.render('bookNow');
});

    
    
    
     


module.exports = router