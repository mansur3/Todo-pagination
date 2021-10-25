import {useState, useEffect} from "react";

import "./todo.css";

export const Todo = () => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
        setLoading(false);
    },[page])

    const getData = () => {
        fetch(`http://localhost:3001/posts?_page=${page}&_limit=2`).then((d) => d.json()).then(setData);
    }

    const handleAddTodo = () => {
        fetch("http://localhost:3001/posts", { 
            method : "POST",
            body : JSON.stringify({
                title : text,
                status : false
            }),
            headers : {
                "Content-Type": "application/json"
            }
        }).then(getData);
    }
    const handleTodoUpdate = (id) => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method : "PATCH",
            body : JSON.stringify({
                // title : text,
                status : true
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(getData);
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(getData);
    }
    return (
        loading? <h1>Loading... </h1> :(
        <div className = "container">
            <div className = "input">
                <input type = "text" placeholder = "Enter the Task" onChange={(e) => { setText(e.target.value)}} />
                <button onClick = {handleAddTodo}>Add Task</button>
            </div>
            
            <div>
                {data.map((e) => (<div className = "oneData" key = {e.id}>
                   <p className = "data"> {e.title} - {e.status.toString()}</p>
                        <button className = "toggle" onClick = {() => { 
                            handleTodoUpdate(e.id);
                        }}>ToggleStatus</button>
                        <button className = "delete" onClick = {() => {
                            handleDelete(e.id);
                        }}>Delete</button>
                    </div>))}
                <div>
                    <button className = "prev" onClick = {() => {setPage(page - 1)}}>Prev</button>
                    <button className = "next" onClick = {() => {setPage(page + 1)}}>Next</button>
                </div>
            </div>
        </div>
        )
    
    )
}