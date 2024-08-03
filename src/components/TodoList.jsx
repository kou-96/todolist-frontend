import { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const BASE_URL = "http://localhost:5003";

  const handleEditClick = (id, description) => {
    setEditId(id);
    setEditValue(description);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValue("");
  };

  useEffect(() => {
    fetch(`${BASE_URL}/todos`)
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
    fetch(`${BASE_URL}/tasks`, {
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
    fetch(`${BASE_URL}/tasks/${id}`, {
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

  const editText = () => {
    fetch(`${BASE_URL}/tasks/${editId}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: editValue }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => (todo.id === editId ? updatedTodo : todo))
        );
        setEditId(null);
        setEditValue("");
      })
      .catch((error) =>
        console.error("タスク更新中に問題が発生しました", error)
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
            {editId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={editText}>保存</button>
                <button onClick={handleCancel}>中止</button>
              </div>
            ) : (
              <div>
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
                <button
                  onClick={() => handleEditClick(todo.id, todo.description)}
                >
                  編集
                </button>
                <button onClick={() => deleteTask(todo.id)}>削除</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
