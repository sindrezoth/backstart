const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const helmet = require("helmet");

const app = express();
app.disable("x-powered-by");
const limiter = rateLimit({
  winowMS: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
const speedLimiter = slowDown({
  winowMS: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
});

app.use(limiter);
app.use(speedLimiter);
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3500", "https://google.com"],
  }),
);

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});
app.get("/tests/html", (req, res) => {
  res.json({ html: "HTML!" });
});
app.get("/mark", (req, res) => {

  res.sendFile(path.join(__dirname, "mark.html"));
})

app.listen(3501, () => {
  console.log("listen on");
});
