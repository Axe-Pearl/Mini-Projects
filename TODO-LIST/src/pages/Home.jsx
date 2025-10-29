import React,{useState} from 'react'
import {nanoid} from 'nanoid'
import Todo from '../components/Todo'
import useLocalStorage from '../hooks/useLocalStorage'

const Home = () => {
    const [todos, setTodos] = useLocalStorage('todos', [])
    const [todo, setTodo] = useState('')

    const addTodo = (e) => {
        e.preventDefault()
        const normalized = todo.trim()
        if (!normalized) return
        const exists = todos.some(t => t.text.trim().toLowerCase() === normalized.toLowerCase())
        if (!exists) {
            setTodos(prev => [...prev, {id: nanoid(), text: normalized}])
            setTodo('')
        }
    }

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    const moveUp = (id) => {
        const index = todos.findIndex(t => t.id === id)
        if (index > 0) {
            const next = [...todos]
            ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
            setTodos(next)
        }
    }

    const moveDown = (id) => {
        const index = todos.findIndex(t => t.id === id)
        if (index < todos.length - 1 && index !== -1) {
            const next = [...todos]
            ;[next[index + 1], next[index]] = [next[index], next[index + 1]]
            setTodos(next)
        }
    }

    return (
    <div className='home'>
      <div className='container'>
                    <form className='todo-form' onSubmit={addTodo}>
                        <input type="text" placeholder='Add item...' value={todo} onChange={(e) => setTodo(e.target.value)}/>
                        <button type='submit' className='btn-addTodo'>Add</button>
                    </form>
          {
                todos.length? (
            <div className='todo-list'>
                {
                    todos.map((todo,index) => {
                        return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} moveUp={moveUp} moveDown = {moveDown} total = {todos.length} index={index}/>
                    })
                }
            </div> ) : <p style={{textAlign:'center', marginTop:'10px', fontWeight:'bold'}}>No todo...</p>

          }
      </div>
    </div>
  )
}

export default Home