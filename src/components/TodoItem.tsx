import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";
import { formatDate } from "../utils/formatDate";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="todo-card">
        <div className="d-flex flex-column">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="todo-input"
            />
          ) : (
            <div className="d-flex align-items-start mb-2">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                disabled={isEditing}
              />
              <div>
                <div
              className={`todo-text ${todo.completed ? "completed" : ""}`}
              onClick={() => onToggle(todo.id)}
            >
              {todo.title}
                </div>
                <small className="text-muted">
                  Last updated: {formatDate(todo.modified_at)}
                </small>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-end">
            {isEditing ? (
              <>
                <button
                  className="btn btn-save btn-sm me-2"
                  onClick={handleSave}
                  disabled={editTitle.trim() === ""}
                  title={editTitle.trim() === "" ? "Todo cannot be empty" : ""}
                >
                  Save
                </button>
                <button
                  className="btn btn-cancel btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-edit btn-sm me-2"
                  onClick={() => {
                    setEditTitle(todo.title);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete btn-sm"
                  onClick={() => onDelete(todo.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

