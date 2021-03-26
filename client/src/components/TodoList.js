import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


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




    return (
        <>
        <form onSubmit={createTask} id="add-task">
            <input type="text" placeholder='Enter new task' onChange={handleChange}/>
            <button type="submit">Create Task</button>
        </form>
        <div>{todos.map(todo => <TodoItem key={todo.id} todo={todo.todo} todoId={todo.id} />)}</div>
        </>
    )
}

export default TodoList;