var express = require('express');
var router = express.Router();
var conn = require('./connection');


router.post('/' , function(req,res){
    let delId = req.body.del;
    conn.query(`DELETE FROM customerdet where orderId = '${delId}'` , function(err,result){
        if (err) {
            console.log(err);
        }else{
            console.log('success!')
            res.redirect('/admin');
        }
    });
});

module.exports = router;