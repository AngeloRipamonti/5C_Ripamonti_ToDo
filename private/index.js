
const express = require("express");
const bodyParser = require('body-parser');
let http = require("http");
const path = require('path');
const app = express();
const todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/todo/add", (req, res) => {
   const todo = req.body.todo;
   todo.id = "" + new Date().getTime();
   todos.push(todo);
   res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
   res.json({ todos: todos });
});

const server = http.createServer(app);

server.listen(80, () => {
   console.log("- server running");
});

app.put("/todo/complete", (req, res) => {
   const todo = req.body;
   try {
      todos = todos.map((element) => {
         if (element.id === todo.id) {
            element.completed = true;
         }
         return element;
      })
   } catch (e) {
      console.error(e);
   }
   res.json({ result: "Ok" });
});

app.delete("/todo/:id", (req, res) => {
   todos = todos.filter((element) => element.id !== req.params.id);
   res.json({ result: "Ok" });
})