const validator_middleware = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }
  res.send({ errors: result.array() });
  next();
};

module.exports = validator_middleware;
