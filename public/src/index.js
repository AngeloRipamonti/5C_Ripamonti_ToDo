import { toDoList } from "./todo.js";

const todoInput = document.getElementById("todoInput");
const insertButton = document.getElementById("insertButton");
const todo = toDoList(document.getElementById("todo"));

await todo.load();

setInterval(async () => {
    await todo.load();
    todoInput.value = "";
}, 30000);

insertButton.onclick = async () => {
    const task = {
        name: todoInput.value,
        completed: false
    }
    await todo.send({ todo: task });
    await todo.load();
    todoInput.value = "";
}

