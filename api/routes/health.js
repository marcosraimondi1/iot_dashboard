const express = require("express");
const { version } = require("../../package.json");
const router = express.Router();

router.get("/health", (req, res) => {
  const health = `Application running on ${process.env.environment}\nCurrently on version ${version}\n`;
  res.send(health);
});

module.exports = router;
