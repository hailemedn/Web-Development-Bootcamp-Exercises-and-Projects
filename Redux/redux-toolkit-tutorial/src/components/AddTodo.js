import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import './styles.css';

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };
  return (
    <form onSubmit={addTodoHandler} className="d-flex flex-column justify-content-center">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Enter to do"
          value={input}
          onChange={e => {setInput(e.target.value)}}
        />
        <label htmlFor="floatingInput">Enter to do</label>
      </div>
      <button className="btn btn-primary w-100 py-2">
        Add to do
      </button>
    </form>
  );
}

export default AddTodo;
