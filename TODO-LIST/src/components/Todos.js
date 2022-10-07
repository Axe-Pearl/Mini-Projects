import React from 'react'
import TodoItems from './TodoItems'

export default function Todos(props) {
  let todoscss = {
    "minHeight": "55vh"

  }
  return (
    <div>
      <div className="col-12" id='todocont'>
        <h3 className="text-center">Todo List</h3>
        {props.todos.length === 0 ? <div className='row text-center my-4'><div className="col-12"><span className='bg-danger text-light px-4 py-2 h6'>No Todos Found!</span></div></div> : props.todos.map((todo) => {
          return (<TodoItems todos={todo} key={todo.sno} onDelteTodo={props.onDelteTodo} />);
        })}
      </div>
    </div>
  )
}
