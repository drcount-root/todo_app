import React, { useState } from "react";

import type { Todo } from "../types/todo";
import { formatDate } from "../utils/formatDate";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="flex-grow-1 me-3">
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <>
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              disabled={isEditing}
            />
            <span
              className={todo.completed ? "text-decoration-line-through" : ""}
            >
              {todo.title}
            </span>
            <small className="text-muted ms-2">
              (Last updated: {formatDate(todo.modified_at)})
            </small>
          </>
        )}
      </div>

      <div className="btn-group btn-group-sm">
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
