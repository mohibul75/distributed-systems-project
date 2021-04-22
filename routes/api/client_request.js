var {rider,driver}=require('../../all clients/all_clients');
var express = require('express');
var router = express.Router();

router.post('/rider',(req,res)=>{
// console.log(req.body);
    rider.push(req.body);
    res.send('driver request accepted');
});

router.post('/driver',(req,res)=>{
   // console.log(req.body);
    driver.push(req.body);
    res.send('rider request accepted');
});

module.exports=router;
