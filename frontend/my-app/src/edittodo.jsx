import React, { useState } from "react";

function EditTodo({ todo, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); 
  const [newDescription, setNewDescription] = useState(todo.description); 

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSaveClick = async () => {
    try {
      const body = { description: newDescription };
      const response = await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        onUpdate(todo.id, newDescription); 
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="p-2 border border-gray-400 rounded"
          />
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={handleEditClick}
          className="text-blue-500 hover:text-green-700 cursor-pointer"
        >
          ✏️ 
        </button>
      )}
    </div>
  );
}

export default EditTodo;