const { setTimeout } = require("node:timers/promises");
const d = require("../dataTMP/data");

async function dbRead(quizCreateFrom) {
  let data = await setTimeout(
    1000,
    (() => {
      const quizes = {};
      for (let topic of quizCreateFrom.topics) {
        //countOfTopics++;
        const topicName = topic.type;
        const amount = topic.amount;

        quizes[topicName] = { title: d[topicName].title };

        const qi = new Array(d[topicName].questioning.length)
          .fill(0)
          .map((_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, amount);

        quizes[topicName].questioning = qi.map(
          (i) => d[topicName].questioning[i],
        );
      }
      return quizes;
    })(),
  );

  return data;
}

module.exports = { dbRead };
