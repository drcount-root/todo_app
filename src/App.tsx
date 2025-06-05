import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import ThemeToggler from "./components/ThemeToggler";
import { debounce } from "./utils/debounceUtil";
import type { Todo } from "./types/todo";

const initialTodos: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    completed: true,
    modified_at: "2025-05-05T00:00:00Z",
  },
  {
    id: 2,
    title: "Check email",
    completed: true,
    modified_at: "2025-05-05T16:15:00Z",
  },
  {
    id: 3,
    title: "Meeting",
    completed: false,
    modified_at: "2025-05-06T10:45:00Z",
  },
];

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(initialTodos);

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
        <button
          className="btn btn-add ms-2"
          onClick={addTodo}
          disabled={!newTodo.trim()}
        >
          Add
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="no-todos text-center">No todos found</p>
      ) : (
        <TodoList
          onEdit={handleEditTodo}
          todos={filteredTodos}
          onToggle={toggleComplete}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
};

export default App;
