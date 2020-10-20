const jwt = require("jsonwebtoken"),
  tokenSecret = require("config").get("tokenSecret");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    req.user = jwt.verify(token, tokenSecret);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
