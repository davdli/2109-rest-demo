const express = require("express");
const router = express.Router();
module.exports = router;

const client = require("../db/client");
client.connect();

router.get("/", async (req, res, next) => {
  try {
      const result = await client.query("SELECT * FROM characters");
      res.send(result.rows);
  } catch (error) {
      next(error);
  }
  res.send("to be implemented");
});

router.post("/", async (req, res, next) => {
  try {
    const nameOfNewCharacter = req.body.name;
    await client.query(`INSERT INTO characters (name, rosternum) VALUES ($1 ,"whatever")`, [nameOfNewCharacter]);
    res.send("Thanks. :) I hope they get in");
  } catch (error) {
      next(error);
  }
})
