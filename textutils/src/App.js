import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textforms from './components/Textforms';
import { useState } from 'react';

function App() {
  const [Mode,setMode] = useState('light');

  const toggleMode =()=>{
    if(Mode=== 'light'){
      setMode('dark');
      document.body.style.backgroundColor='#352F44';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }
  return (
    <>
    <Navbar title = "TextUtils" mode={Mode} toggleMode={toggleMode} aboutText=" About us"/>
    <div className="container"> 
   <Textforms heading ="Enter the text below" mode={Mode} />
    </div>
    </>
  );
}

export default App;
