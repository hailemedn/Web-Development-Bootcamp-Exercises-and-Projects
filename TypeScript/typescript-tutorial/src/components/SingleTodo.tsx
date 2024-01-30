import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Todo } from "../model";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => (todo.id !== id)))
  }

  const handleEdit = (e: React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (
        todo.id === id ? {...todo, todo: editTodo}: todo
      ) )
    )
    setEdit(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <form action="" className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? <input ref={inputRef} type="text" value={editTodo} onChange={(e) => {
        setEditTodo(e.target.value)
      }} className="todos__single--text"/>
      : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div className="todos__single--icons">
        <span className="icon" onClick={() => {
          if(!edit && !todo.isDone) {
            setEdit(!edit);
          }
        }}>
          <CiEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <FaCheck />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
