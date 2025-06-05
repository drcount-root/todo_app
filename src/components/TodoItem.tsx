import { useState } from "react";
import { formatDate } from "../utils/formatDate";

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="todo-card">
        <div className="d-flex flex-column">
          {isEditing ? (
            <input
              type="text"
              className="form-control todo-input mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
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
                  onClick={() => setIsEditing(true)}
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
