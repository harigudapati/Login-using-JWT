const router = require("express").Router();
const pool = require("../db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const validInfo = require("../middleware/validInfo");
require("dotenv").config();

router.post("/", validInfo, async (req, res) => {
  try {
    console.log("entered forgot password");

    if (req.body.email === "") {
      res.status(400).send("email required");
    }
    console.error(req.body.email);

    const user = await pool.query(
      "SELECT user_email FROM users WHERE user_email=$1",
      [req.body.email]
    );

    console.log("user", user);

    if (user.rows.length === 0) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      // user.update({
      //   resetPasswordToken: token,
      //   resetPasswordExpires: Date.now() + 3600000
      // });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "192.168.43.86",
        // port: 587,
        // secure: false, // true for 465, false for other ports

        auth: {
          user: "atco1027@gmail.com",
          pass: "5Wonder$"
        }
      });

      /* 1) Turn on Allow less secure apps
         2)Allow Less secure app access
          in google account(atco1027@gmail.com) under security option */

      const mailOptions = {
        from: "atco1027@gmail.com",
        to: "monu.agarwal.1027@gmail.com",
        subject: "Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://localhost:3000/resetPassword\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };

      console.log("sending mail");

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the res: ", response);
          res.status(200).json("recovery email sent");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
