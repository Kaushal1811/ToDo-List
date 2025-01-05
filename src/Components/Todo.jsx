import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { updateTodo } from "../features/todo/todoSlice";

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEdit = (id, text) => {
    setEditId(id); // Set the current todo being edited
    setNewText(text); // Set the initial text for editing
  };

  const handleSave = (id) => {
    if (newText.trim().length >= 7) {
      dispatch(updateTodo({ id, newText }));
      setEditId(null);
      setNewText("");
    }
  };
  return (
    <>
      <h2 className="text-white text-xl">Your Todo List</h2>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  minLength="7"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="text-black px-2 py-1 rounded"
                />
                {newText.trim().length < 7 && (
                  <span className="text-red-500 text-sm mt-1">
                    Minimum length is 7 characters
                  </span>
                )}
              </div>
            ) : (
              <div className="text-white">{todo.text}</div>
            )}
            <div className="m-2 flex">
              {editId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  className="text-white bg-green-500 border-0 p-2 mx-2 focus:outline-none rounded text-md"
                  disabled={newText.trim().length < 7}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="text-white bg-blue-500 border-0 p-2 mx-2 focus:outline-none rounded text-md"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 p-2 focus:outline-none rounded text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
