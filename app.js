const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const rootIndex = require("./routes/index");
const db = require("./models/index");

app.set("port", process.env.port || 3000);
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("<h1>WelCome To our Food Delivery Portal<h1>");
});
app.use("/api", rootIndex);
db.sequelize.sync();

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});
