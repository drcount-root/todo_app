import { useEffect, useState } from "react";

import { TodoList } from "./components/TodoList";
import ThemeToggler from "./components/ThemeToggler";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("../data/data.json")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Failed to fetch data.json:", error);
      });
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
      modified_at: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newEntry]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              modified_at: new Date().toISOString(),
            }
          : todo
      )
    );
  };

  const handleEditTodo = (id, newTitle) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, modified_at: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container position-relative">
      <ThemeToggler />
      <h2 className="todo-title">Todo List</h2>
      <div className="input-card d-flex align-items-center">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-add ms-2" onClick={addTodo}>
          Add
        </button>
      </div>
      <TodoList
        onEdit={handleEditTodo}
        todos={todos}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default App;
