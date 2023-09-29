const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loanRoutes = require("./routes/ltk");
const port = 3000;
const isLocal = true;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "✨ 👋🌏 ✨",
    stage: process.env.NODE_ENV,
  });
});

app.get("/ping", (req, res) => {
  res.json({
    message: "🏓",
  });
});

app.use("/loans", loanRoutes);

if (isLocal) {
  //local host
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} else {
  //for lambda export
  module.exports = app;
}
