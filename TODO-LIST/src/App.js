import { useEffect, useState } from 'react';
import AddTodos from './components/AddTodos';
import Todos from './components/Todos';
import './App.css';
import $ from 'jquery';
function App() {
  let inittodo;
  if (localStorage.getItem("todos") == null) {
    inittodo = []
  }
  else {
    inittodo = JSON.parse(localStorage.getItem("todos"));

  }
  const onDelteTodo = (todo) => {
    setTodos(todos.filter((e) => {
      return (e !== todo)
    }))
    localStorage.removeItem("todo", JSON.stringify(todos));

  }
  const Addtodos = (title) => {
    let sno;
    if (todos.length == 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const newTodo = {
      sno: sno,
      title: title
    }
    setTodos([...todos, newTodo])

  }
  const [todos, setTodos] = useState(inittodo)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    <div className='container-fluid'>
      <div className="row justify-content-center align-items-center h-100vh">
        <AddTodos Addtodos={Addtodos} />
        <Todos todos={todos} onDelteTodo={onDelteTodo} />
      </div>
    </div>
  );
}

export default App;
