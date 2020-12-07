const express = require("express");
const postRouter = require('../posts/posts-router')

const app = express();

app.use(express.json());

app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node API Project 2..." });
  clashAPI();
});

module.exports = app;