const { Router } = require('express');
const app = Router();

const Singleton = require('../utils/Singleton');
const todosSingleton = Singleton.getInstance();


// Moved to index.js to demonstrate Singleton
// app.get('/todos', (req, res) => {
//   return res.status(200).json(todos);
// });

app.post('/todos', (req, res) => {
  try {
    const { item, completed } = req.body;
    if (!item || completed === undefined) {
      throw new Error('Mising item or completed');
    }

    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      item,
      completed,
    };
    todosSingleton.pushTodo(newTodo);
    // todos.push(newTodo);
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(400).json({
      error: error.message || error,
    });
  }
});

app.get('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = todosSingleton.getTodos().find((todo) => todo.id == id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(404).json({
      error: error.message || error,
    });
  }
});

app.put('/todos/:id', (req, res) => {
  try {
    const id = req.params.id;
    const todos = todosSingleton.getTodos();
    const todo = todos.find((todo) => todo.id == id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed = req.body.completed;
    todosSingleton.setTodos(todos);
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(404).json({
      error: error.message || error,
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  try {
    const id = req.params.id;
    const todos = todosSingleton.getTodos();
    const index = todos.findIndex((todo) => todo.id == id);
    if (index < 0) {
      throw new Error('Todo not found');
    }

    todos.splice(index, 1);
    todosSingleton.setTodos(todos);
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(404).json({
      error: error.message || error,
    });
  }
});

module.exports = app;
