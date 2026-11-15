import { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/todos"
    );

    setTodos(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
        window.location="/";
        return;
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;

    await axios.post(
      "http://localhost:5000/api/todos",
      {
        title: task,
      }
    );

    setTask("");
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      {
        completed: !completed,
      }
    );

    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/todos/${id}`
    );

    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Todo Dashboard</h1>

        <button
        onClick={logout}
        style={{
            marginBottom: "20px",
        }}
        >
        Logout
        </button>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task"
        style={{ color: "black" }}
      />

      <button
        onClick={addTodo}
        style={{ marginLeft: "10px" }}
      >
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
                color: todo.completed
                  ? "lightgreen"
                  : "white",
              }}
            >
              {todo.title}
            </span>

            <button
              onClick={() =>
                toggleComplete(
                  todo._id,
                  todo.completed
                )
              }
              style={{ marginLeft: "10px" }}
            >
              {todo.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() =>
                deleteTodo(todo._id)
              }
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;