const router = require("express").Router();
const pool=require("../db");
const authorization=require("../middleware/authorization");
const { query } = require("../db");

router.get("/",authorization,async(req,res)=>{
    try {
        
//req.user has the payload 
// res.json(req.user);

const user=await pool.query("select user_name from users where user_id=$1",[req.user]);
res.json(user.rows[0]);

    } catch (err){
        console.error(err.message);
        res.status(500).json("Server Error");
        
    }
});



module.exports=router;