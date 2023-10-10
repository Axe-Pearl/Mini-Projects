import React,{useState} from 'react'


export default function Textforms(props) {
    const handleupClick = ()=>{
        // console.log("upppercase was clicked"+ text);
        let newText= text.toUpperCase();
        setText(newText)
    }
    const handlelowClick = ()=>{
        // console.log("upppercase was clicked"+ text);
        let newText= text.toLowerCase();
        setText(newText)
    }
    const handleClick = ()=>{
        // console.log("upppercase was clicked"+ text);
        let newText= ("");
        setText(newText)
    }
    const handlecopyClick = ()=>{
        var text = document.getElementById("mybox");
        text.select();
        navigator.clipboard.writeText(text.value);
       
    }
    // const handleinClick = ()=>{
    //     // console.log("upppercase was clicked"+ text);
    //     let newText= if{
            
    //     };
    //     setText(newText)
    // }
    const handleOnChange = (event)=>{
        // console.log("on change");
        setText(event.target.value);
    }
    const[text,setText]= useState('');

  return (
    <><div className="container" style={{color:props.mode==='dark'?'white':'#352F44'}}>
    <h3 >{props.heading}</h3>
 <div className="mb-3">
 <label htmlFor="mybox" className="form-label"></label>
 <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#D8D9DA':'white'}}id="mybox" rows="8"></textarea>
 </div>
 <button className="btn btn-outline-secondary my-1"  onClick={handleupClick}>Convert to uppercase</button>
 <button className="btn btn-outline-secondary mx-2 my-1" onClick={handlelowClick}>Convert to lowercase</button>
 <button className="btn btn-outline-secondary mx-2 my-1" onClick={handleClick}>Clear text</button>
 <button className="btn btn-outline-secondary mx-2 my-1" onClick={handlecopyClick}>Copy text</button>
 {/* <button className="btn btn-secondary mx-2" onClick={handleinClick}>Inverse case</button> */}
 </div>
 <div className="container">
    <h3 style={{color:props.mode==='dark'?'white':'#352F44'}}>Your text summary</h3>
    <p style={{color:props.mode==='dark'?'white':'#352F44'}}>
        {text.length} characters and {text.split(" ").filter((element)=>{return element.length!==0}).length} words
    </p>
    
        <h4 style={{color:props.mode==='dark'?'white':'#352F44'}}>preview</h4>
        {text}
 </div></>
    
  )
}
