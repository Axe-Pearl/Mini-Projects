import React, { useState } from 'react'
import '../App.css';
export default function AddTodos({ Addtodos }) {
    const [title, setTitle] = useState("");
    let submit = (e) => {
        e.preventDefault();
        if (!title) {
            alert("Fields Are Required")
        }
        else {
            Addtodos(title)
            setTitle("")
        }
    }
    return (
        <>
            <div className="col-10 col-md-5">
                <h4 className='text-center'>Add Todo</h4>
                <form className='m-auto mt-4' onSubmit={submit}>
                    <div className="row mb-3 mt-3 align-items-center addtodo">
                        <div className="col-10">
                            <input type="text" className="form-control border border-primary" placeholder='Add Todo' id="exampleInputEmail1" value={title} onChange={(e) => setTitle(e.target.value)} aria-describedby="emailHelp" />
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
