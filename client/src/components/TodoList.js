import React, { useState, useEffect } from 'react';


function TodoList(){
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/tasks')
        .then(data => data.json())
        .then(dbData => {
            setTodos(dbData);
        })
        .catch(err => {
            console.log(err);
            alert('No Tasks found');
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
        .then(todo => console.log(todo))
        .catch(err => {
            console.log(err);
            alert('Cannot create task');
        });

        
    }

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const deleteTask = (id) => {
        fetch(`http://localhost:3001/api/tasks/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
            alert('Cannot delete task');
        });  
    }

    const editTask = (id) => {
        
    }

    return (
        <>
        <form onSubmit={createTask} id="add-task">
            <input type="text" placeholder='Enter new task' onChange={handleChange}/>
            <button type="submit">Create Task</button>
        </form>
        <div>{todos.map(todo => <div key={todo.id}><h4>{todo.todo}</h4><button type="button" onClick={() => deleteTask(todo.id)}>Delete</button><button type="button" onClick={() => editTask(todo.id)}>Edit</button></div>)}</div>
        </>
    )
}

export default TodoList;