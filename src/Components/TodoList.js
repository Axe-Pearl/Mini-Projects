import React from "react";
import Todo from "./Todo";
const Todolist = (props) => {

  return (
    <div className="todo-container">
      <ul className="todo-list">
      {props.todos.map((todo) => (
        
          <Todo todos ={props.todos} setTodos={props.setTodos} id={todo.id} text ={todo.text} />
      ))}
      </ul>
    </div>
  );
};
export default Todolist;