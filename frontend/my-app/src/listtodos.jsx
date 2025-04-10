import React, { useState, useEffect } from "react";
import EditTodo from "./edittodo";

function List_todos() {
  const [todos, settodos] = useState([]);

  async function gettodos() {
    try {
      const response = await fetch("http://localhost:5000/alltodos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      settodos(json);
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdate = (id, newDescription) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  };

  async function deletetodos(id) {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        settodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    gettodos();
  }, []);

  return (
    <div className=" flex justify-center items-center gap-2 py-7">
      <table className="w-3/4 text-emerald-400 text-center border-collapse border border-gray-400 shadow-lg rounded-lg bg-gray-800">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-600 px-4 py-2">ID</th>
            <th className="border border-gray-600 px-4 py-2">DESCRIPTION</th>
            <th className="border border-gray-600 px-4 py-2"></th>
            <th className="border border-gray-600 px-4 py-2"> </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2 text-fuchsia-600">
                {index + 1}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {todo.description}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <EditTodo todo={todo} onUpdate={handleUpdate} />
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => deletetodos(todo.id)}
                >
                   🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List_todos;