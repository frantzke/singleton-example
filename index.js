const express = require('express');
const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const Singleton = require('./utils/Singleton');
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
const todosSingleton = Singleton.getInstance();

console.log(singleton1.getValue());
console.log(singleton2.getValue());

const todosRouter = require('./src/todos');

//Example Express Server
let counter = 0;

app.get('/increment', (req, res) => {
  counter++;
  res.status(200).json({ counter });
});

app.get('/decrement', (req, res) => {
  counter--;
  res.status(200).json({ counter });
});

app.get('/counter', (req, res) => {
  res.status(200).json({ counter });
});

app.use(todosRouter);

app.get('/todos', (req, res) => {
  const todos = todosSingleton.getTodos();
  return res.status(200).json(todos);
});

http.listen(5678, () => console.log('listening on http://localhost:5678'));
