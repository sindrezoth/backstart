const path = require("path");
const fs = require("fs");

function requestLog(req, res, next) {
  // console.log(req.headers);
  const p = path.resolve(__dirname, "requestLogs.txt");
  let toLog = new Date().toLocaleString("ru-RU") + " Request incoming:\n";
  toLog += `\tHeaders:\n`;
  for (let header in req.headers) {
    toLog += `\t\t${header}: ${req.headers[header]}\n`;
  }
  toLog += "\tIP:\n";
  toLog += `\t\tremoteAddress: ${req.socket.remoteAddress}\n`;
  toLog += `\t\tIP forwarded for: ${req.headers["x-forwared-for"]}\n`;
  toLog += `\t\tURL: ${req.protocol}://${req.get("host")}${req.originalUrl}\n`;
  toLog += "\n";

  fs.appendFileSync(
    path.resolve(__dirname, "..", "logs", "requestLogs.txt"),
    toLog,
  );

  next();
}

module.exports = requestLog;
