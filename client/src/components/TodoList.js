import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


function TodoList(){
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/tasks')
        .then(data => data.json())
        .then(dbData => {
            setTodos(dbData);
        })
        .catch(err => {
            console.log(err);
            
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
            body: JSON.stringify({"todo": task, "status": status})
        })
        .then(data => data.json())
        .then(todo => console.log(todo))
        .catch(err => {
            console.log(err);
            alert('Cannot create task');
        });

        
    }

    const handleChange = (event) => {
        let taskValue = document.getElementById('task-input');
        setTask(taskValue.value);
        let statusValue = document.getElementById('status');
        setStatus(statusValue.value);
    }




    return (
        <>
        <form onSubmit={createTask} id="add-task">
            <input type="text" placeholder='Enter new task' id="task-input"/>
            <br/>
            <label htmlFor="status">Choose a status:</label>
            <select name="status" id="status" onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
            </select>
            <button type="submit">Create Task</button>
        </form>
        <div>{todos.map(todo => <TodoItem key={todo.id} todo={todo.todo} todoId={todo.id} status={todo.status} />)}</div>
        </>
    )
}

export default TodoList;