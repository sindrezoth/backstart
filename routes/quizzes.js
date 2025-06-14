const express = require("express");
const router = express.Router();
const getQuizzes = require("../api/quizzes/quizzes");

router.route("/").get(
  (() => {
    console.log("hello");
    return getQuizzes;
  })(),
);

module.exports = router;
