

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({msg:"test_success2"})
})

router.post('/',(req,res)=>{
    res.json({data:req.body,msg:"success"})
})

module.exports = router