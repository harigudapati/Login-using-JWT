const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
require("dotenv").config();

router.put("/", validInfo, async (req, res) => {
  try {
    console.log(req.body.newPassword);
    const { newPassword } = req.body;
    console.log(newPassword);
    const saltRound = 10;
    // const salt=await bcrypt.genSalt(saltRound);
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(newPassword, salt);
    const user = await pool.query(
      "Update users set user_password = $1 where user_email='monu.agarwal.1027@gmail.com'",
      [bcryptPassword]
    );
    console.log("update user", user);
    console.log("password updated");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
