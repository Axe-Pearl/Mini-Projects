import React, { useState } from 'react'

const Todo = ({ todo, deleteTodo, editTodo, moveUp, moveDown, total, index }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const [newDesc, setNewDesc] = useState(todo.desc)

  const handleSave = () => {
    if (newTitle.trim()) {
      editTodo(todo.id, newTitle, newDesc)
      setIsEditing(false)
    }
  }

  return (
    <div className='todo'>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Edit description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3 className="text">{todo.title}</h3>
          {todo.desc && <p>{todo.desc}</p>}
          <div className='utils'>
            <div
              className='go-up'
              style={{ borderBottomColor: index === 0 ? 'grey' : '#1DA1F2' }}
              onClick={() => moveUp(todo.id)}
            ></div>
            <div
              className='go-down'
              style={{ borderTopColor: index === total - 1 ? 'grey' : '#1DA1F2' }}
              onClick={() => moveDown(todo.id)}
            ></div>
            <div
              className='remove'
              onClick={() => deleteTodo(todo.id)}
            ></div>
            <div
              className='edit'
              onClick={() => setIsEditing(true)}
              style={{ cursor: 'pointer', marginLeft: '10px', color: '#1DA1F2' }}
            >
              ✏️
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Todo
