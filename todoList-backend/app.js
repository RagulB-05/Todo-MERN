const express = require("express");
const cors = require("cors");

const server = express();
const mongoose = require("mongoose");

server.use(express.json());
server.use(cors());

mongoose
  .connect("mongodb://localhost:27017/todos-app")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// creating Schema
const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

//creating model

const todoModel = mongoose.model("Todo", todoSchema);

// POST API

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodos = new todoModel({ title, description });
    await newTodos.save();
    res.status(201).json(newTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const udpatedTodo = await todoModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!udpatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(udpatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

server.route("/todos").post(createTodo).get(getTodo);

server.route("/todos/:id").put(updateTodo).delete(deleteTodo);

port = 3000;

server.listen(port);
