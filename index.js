require("dotenv").config()
const express = require("express")
const app = express()
const dbCon = require("./config/dbCon")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
app.use(express.json());

const PORT = 8080


dbCon()
app.get("/",(res,req) => {
    req.send("Server is up")    
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/register", require("./Routes/registerRoute"))

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});