import React from 'react';
import { useState } from 'react';

const Todo = ({ todo,deleteTodo,moveUp,moveDown,total,index}) => {

    const [todos, settodos] = useState(null);
// added a seperate function for deleting todos
    function deleteTodo(index) {
        todos.filter((_, index) => { todo => != index });
    }
    
    return (
        <div className='todo'>
            <p className='text'>{todo.text}</p>
                <div className='utils'>
                <div className='go-up' style={{borderBottomColor:index === 0 ? 'grey' : '#1DA1F2'}} onClick={() => moveUp(todo.id)}></div>
                <div className='go-down' style={{borderTopColor:index === total - 1 ? 'grey' : '#1DA1F2'}} onClick={() => moveDown(todo.id)}></div>
                <div className='remove'  onClick={() => deleteTodo(todo.id)}></div>
            </div>
        </div>
    )
}

export default Todo
