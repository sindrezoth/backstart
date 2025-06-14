function logging(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
}

module.exports = logging;
