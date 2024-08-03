import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5003/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) =>
        console.error("Todo の取得中にエラーが発生しました:", error)
      );
  }, []);

  const addTask = () => {
    if (!newTodo.trim()) {
      alert("タスクを入力してください。");
      return;
    }
    fetch("http://localhost:5003/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newTodo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
      })
      .catch((error) =>
        console.error("Todo の追加中にエラーが発生しました:", error)
      );
  };

  const patchTask = (id, completed) => {
    fetch(`http://localhost:5003/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      })
      .catch((error) =>
        console.error("Todo の更新中にエラーが発生しました:", error)
      );
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5003/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) =>
        console.error("Todo の削除中にエラーが発生しました:", error)
      );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        style={{ marginBottom: "10px" }}
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="入力してください。"
      />
      <button onClick={addTask}>追加</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "3px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => patchTask(todo.id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                margin: "10px",
              }}
            >
              {todo.description}
            </span>
            <button onClick={() => deleteTask(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
