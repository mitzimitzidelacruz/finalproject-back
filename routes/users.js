const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
    });
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      password: req.body.password,
      updatedAt: Date.now(),
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/complete/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      completed: !currentUser.completed,
      updatedAt: Date.now(),
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(userDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
