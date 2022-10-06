import React , {useState} from 'react';
import Form from './Components/TodoForm';
import './App.css';
import Todolist from './Components/TodoList';
function App() {
  const [inputText , setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  return (
    
    <div className="App">
      <header>
          <h1>Todo List </h1>
          <br></br>
          
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}/>
      <Todolist setTodos={setTodos} todos={todos}  disp={inputText} />
    </div>
  );
}

export default App;
