import React, { useState } from 'react';
const form = (props) => {

  const formip = (e) =>{
    props.setInputText(e.target.value)
  }
  const submitTodoHandler = (e) =>{
    e.preventDefault();
    props.setTodos([
      ...props.todos,
      {text : props.inputText, id:Math.random()}
    ])
    props.setInputText("")
  }  
  return(
            <form>
                <br />
      <input value={props.inputText} onChange={formip} type="text" className="todo-input" />
      <button className="todo-button" type="submit" onClick={submitTodoHandler}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
        
      </div>
    </form> 
            
        
    );
}
export default form;