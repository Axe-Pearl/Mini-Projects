// Todo.jsx
import React, { useState } from 'react';

const Todo = ({ todo, deleteTodo, moveUp, moveDown, editTodo, total, index }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.text);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    editTodo(todo.id, editedTitle);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(todo.text);
    setEditing(false);
  };

  return (
    <div className='todo'>
      
        <div className='text'>
          {isEditing ? (
            <input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <p>{todo.text}</p>
          )}
        </div>
        <div className='utils'>
          <div
            className='edit'
            onClick={handleEditClick}
            style={{ marginRight: '8px' }}
          >
            Edit
          </div>
          <div
            className='go-up'
            style={{
              borderBottomColor: index === 0 ? 'grey' : '#1DA1F2',
            }}
            onClick={() => moveUp(todo.id)}
          ></div>
          <div
            className='go-down'
            style={{
              borderTopColor: index === total - 1 ? 'grey' : '#1DA1F2',
            }}
            onClick={() => moveDown(todo.id)}
          ></div>
          <div
            className='remove'
            onClick={() => deleteTodo(todo.id)}
          ></div>
        </div>
      
      {isEditing && (
        <div className='edit-utils'>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
