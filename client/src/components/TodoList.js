import React, { useState, useEffect } from 'react';


function TodoList(){
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/tasks')
        .then(data => data.json())
        .then(dbData => {
            setTodos(dbData);
        });
    })
    const createTask = async event => {
        event.preventDefault();
        event.target.reset();

        fetch('http://localhost:3001/api/tasks', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"todo": task})
        })
        .then(data => data.json())
        .then(todo => console.log(todo));

        
    }

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const deleteTask = (event) => {
        event.preventDefault();
    }

    return (
        <>
        <form onSubmit={createTask} id="add-task">
            <input type="text" placeholder='Enter new task' onChange={handleChange}/>
            <button type="submit">Create Task</button>
        </form>
        <div>{todos.map(todo => <div key={todo.id}><h4>{todo.todo}</h4><button onClick={deleteTask}>Delete</button><button>Edit</button></div>)}</div>
        </>
    )
}

export default TodoList;