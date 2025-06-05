import { useEffect, useState } from "react";

import { TodoList } from "./components/TodoList";
import ThemeToggler from "./components/ThemeToggler";
import type { Todo } from "./types/todo";
import { debounce } from "./utils/debounceUtil";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch((error) => {
        console.error("Failed to fetch data.json:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    const debouncedFilter = debounce((query: string) => {
      const lowercased = query.toLowerCase();
      setFilteredTodos(
        todos.filter((todo) => todo.title.toLowerCase().includes(lowercased))
      );
    }, 300);

    debouncedFilter(search);
  }, [search, todos]);

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
    <div className="container position-relative">
      <ThemeToggler />
      <h2 className="todo-title">Todo Manager</h2>

      <div className="input-card d-flex align-items-center mt-3">
        <input
          type="text"
          className="todo-input"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
        todos={filteredTodos}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export default App;
