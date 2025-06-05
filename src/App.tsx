import { useEffect, useState } from "react";

import TodoList from "./components/TodoList";
import "./styles/custom.css";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newEntry: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
      modified_at: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newEntry]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
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

  const handleEditTodo = (id: number, newTitle: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, modified_at: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 My Todo List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
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
}

export default App;
