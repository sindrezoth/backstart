const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const helmet = require("helmet");
const requestLog = require("./middleware/requestLog");
const logging = require("./middleware/logging");

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
    origin: [
      "http://localhost:3500",
      "http://localhost:3501",
      "http://localhost:5173",
    ],
  }),
);

app.use(requestLog);
app.use(logging);

app.use(express.static("public"));

app.use("/quiz", require("./routes/quizzes"));

app.listen(3501, () => {
  console.log("listen on");
});
