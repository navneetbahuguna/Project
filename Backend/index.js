const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
let mongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan"); //for view the details of running time
//require("./mongo")  //return data from mongo.js file
var port = process.env.PORT || 4002;

app.use("/NBProject", require("./routes/userRoutes/posts")); //1st method
const adminRoutes = require("./routes/adminRoutes/posts"); //2nd method
app.use("/NBProject",adminRoutes )

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});


//Routes not found
app.use((req, res, next) => {
  req.status = 404;
  const error = new error("Rooutes not found");
  next(error);
});

//another method
// app.use((req,res,next) =>{
//   res.status(404).send('<h1>Page Not Found <h1>')
// })
//error handler
app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});
// // Setup server port

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running  on port " + port);
});
