import React, { useState } from 'react'


const Todo = ({ todo, deleteTodo, moveUp, moveDown, total, index }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

    
    return (
        <div className='todo'>
            {isEditing ? (
  <input
    type="text"
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
  />
) : (
  <p className='text'>{todo.text}</p>
)}

                <div className='utils'>
                <div className='go-up' style={{borderBottomColor:index === 0 ? 'grey' : '#1DA1F2'}} onClick={() => moveUp(todo.id)}></div>
                <div className='go-down' style={{borderTopColor:index === total - 1 ? 'grey' : '#1DA1F2'}} onClick={() => moveDown(todo.id)}></div>
  <div className='remove' onClick={() => deleteTodo(todo.id)}></div>

<div
  className='edit'
  onClick={() => setIsEditing(true)}
>
</div>

{isEditing && (
  <button
    onClick={() => {
      todo.text = editText;
      setIsEditing(false);
    }}
  >
    Save
  </button>
)}

            </div>
        </div>
    )
}

export default Todo
