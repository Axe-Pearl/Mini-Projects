import React from 'react'
import '../App.css'

export default function TodoItems(props) {
    return (
        <div className="col-10 col-md-5 m-auto todoss my-2 py-2 px-2">
            <div className='row justify-content-between my-2 align-items-center' >
                <div className="col-8"><h5 className='text-left text-capitalize fw-semi-bold'>{props.todos.title}</h5></div>
                <div className="col-4 text-end">
                    <button className='btn text-center btn-sm'>
                        <i className='fa-solid fa-triangle'></i>
                    </button>
                    <button className='btn text-center btn-sm fa-rotate-180'>
                        <i className='fa-solid fa-triangle'></i>
                    </button>
                    <button className="text-center btn btn-sm p-0 px-1 px-1 py-1" onClick={() => { props.onDelteTodo(props.todos) }}><i className='fa-solid fa-times fa-2x'></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
