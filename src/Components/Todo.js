import React from "react";

const Todo = (props) => {
  
  const deleteHandler =() =>{
   
    props.setTodos(props.todos.filter((el) =>el.id !== props.id ))
  }
  const completeHandler = () =>{
    alert( "Task : " + props.text +  " " +  "has been completed")
    props.setTodos(props.todos.filter((el) =>el.id !== props.id ))
  }
  
  return (
    <div className="todo">
      <li   className="todo-item">{props.text}</li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
      
    </div>

  );
};

export default Todo;
