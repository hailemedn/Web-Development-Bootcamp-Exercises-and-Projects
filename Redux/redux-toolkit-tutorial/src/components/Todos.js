import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./styles.css";
import { removeTodo, completedTask } from "../features/todo/todoSlice";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  return (
    <>
      <h1 className="my-3 h1">2dos</h1>
      <div className="list-group">
        {todos.map((todo) => (
          <label className="list-group-item d-flex gap-2" key={todo.id}>
            <input
              className="form-check-input flex-shrink-0"
              type="checkbox"
              onClick={() => {
                dispatch(completedTask(todo.id));
              }}
            />
            {todo.completedTask ? <s>{todo.text}</s> : <span>{todo.text}</span>}
            <button
              className="float-right"
              onClick={() => {
                dispatch(removeTodo(todo.id));
              }}
            >
              <MdOutlineDeleteOutline />
            </button>
          </label>
        ))}
      </div>
    </>
  );
}

export default Todos;
