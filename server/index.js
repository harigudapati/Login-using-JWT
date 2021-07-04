const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //req body
app.use(cors());

//routes//

//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.use("/forgotPassword", require("./routes/forgotPassword"));
app.use("/updatePasswordViaEmail", require("./routes/updatePasswordViaEmail"));

app.listen(5000, () => {
  console.log("server is running on the port 5000");
});
