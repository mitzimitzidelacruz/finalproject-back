const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ deleted: false });
    res.json(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      image: req.body.image,
    });
    const todoSaved = await todo.save();
    res.json(todoSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      completed: req.body.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/complete/:id", async (req, res) => {
  try {
    const currentTodo = await Todo.findById(req.params.id);
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      completed: !currentTodo.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const todoDeleted = await Todo.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(todoDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;