import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <>
      {incompleteTodos.length > 0 && (
        <>
          <h3 className="section-title">Tasks</h3>
          <div className="row">
            {incompleteTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </>
      )}
      {completedTodos.length > 0 && (
        <>
          <h3 className="section-title mt-4">Completed</h3>
          <div className="row">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
