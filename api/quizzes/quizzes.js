const { setTimeout } = require("node:timers/promises");
const util = require("util");
const d = require("../../dataTMP/data");
const { dbRead } = require("../../db/simulate");

async function getQuizzes(req, res) {
  const topics = req.query;
  if (!topics) return res.status(400).json({ message: "Bad request" });

  const quizCreateFrom = {
    topics: [],
    amount: 0,
  };
  quizCreateFrom.amount = +topics.amount;
  delete topics.amount;

  for (const topic in topics) {
    quizCreateFrom.topics.push({
      type: topic,
      ...topics[topic].reduce(
        (o, p) => {
          if (!isNaN(p)) {
            o.amount = +p;
            return o;
          }

          if (["easy", "medium", "hard"].includes(p)) {
            o.level.push(p);
            return o;
          }

          return o;
        },
        { level: [], amount: 0 },
      ),
    });
  }

  let data = await dbRead(quizCreateFrom);

  res.json(data);
}

module.exports = getQuizzes;
