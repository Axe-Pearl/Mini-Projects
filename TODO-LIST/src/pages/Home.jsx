import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Todo from '../components/Todo';

const getTodos = () => {
  let todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
};

const Home = () => {
  const [todos, setTodos] = useState(getTodos());
  const [todo, setTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (todo && todos.findIndex(t => t.text === todo) === -1) {
      setTodos(prev => [
        ...prev,
        { id: nanoid(), text: todo, date: new Date().toISOString() }
      ]);
      setTodo('');
    }
  };

  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));

  const moveUp = (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index > 0) {
      [todos[index - 1], todos[index]] = [todos[index], todos[index - 1]];
      setTodos([...todos]);
    }
  };

  const moveDown = (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index < todos.length - 1) {
      [todos[index + 1], todos[index]] = [todos[index], todos[index + 1]];
      setTodos([...todos]);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;

    const todoDate = new Date(todo.date);
    const now = new Date();

    if (filter === 'today') {
      return (
        todoDate.getDate() === now.getDate() &&
        todoDate.getMonth() === now.getMonth() &&
        todoDate.getFullYear() === now.getFullYear()
      );
    }

    if (filter === 'thisWeek') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return todoDate >= startOfWeek && todoDate <= endOfWeek;
    }

    return true;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='home'>
      <div className='container'>

        {/* Input + Button + Filter in a row */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
          <form
            className='todo-form'
            onSubmit={addTodo}
            style={{ display: 'flex', gap: '10px', flex: 1 }}
          >
            <input
              type="text"
              placeholder='Add item...'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              style={{ flex: 1, padding: '8px' }}
            />
            <input
              type='button'
              onClick={addTodo}
              className='btn-addTodo'
              value='Add'
              style={{ padding: '8px 12px' }}
            />
          </form>

          {/* Filter on the right */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '8px', fontSize: '0.9em' }}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
          </select>
        </div>

        {/* Todo List */}
        {filteredTodos.length ? (
          <div className='todo-list'>
            {filteredTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                moveUp={moveUp}
                moveDown={moveDown}
                total={filteredTodos.length}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign:'center', marginTop:'10px', fontWeight:'bold' }}>
            No todo...
          </p>
        )}

      </div>
    </div>
  );
};

export default Home;
