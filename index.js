const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const db = require("./config/database");
db.authenticate()
  .then(() => {
    console.log("Database has been connected");
  })
  .catch(() => {
    console.log("Error occured while connecting to database");
  });
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

const PORT = process.env.PORT || 5000;
db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
