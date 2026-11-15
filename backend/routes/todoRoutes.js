const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title
  });

  res.json(todo);
});

router.put("/:id", async (req, res) => {

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      completed: req.body.completed
    },
    {
      new: true
    }
  );

  res.json(todo);

});

router.delete("/:id", async (req, res) => {

  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Todo Deleted"
  });

});

module.exports = router;