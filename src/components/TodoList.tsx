import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <ul className="list-group">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;