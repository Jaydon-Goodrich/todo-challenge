import React, {useState} from 'react';

const TodoItem = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [editTodo, setEditTodo] = useState('');

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
    
    const saveTask = async (id) => {
    
        fetch(`http://localhost:3001/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"todo": editTodo})
        })
        .then(data => data.json())
        .then(todo => setIsEdit(false))
        .catch(err => {
            console.log(err);
            alert('Cannot create task');
        });
    
        
    }
    
    const editTask = (id, todo) => {
        setIsEdit(true);
    }

    const handleChange = (event) => {
        setEditTodo(event.target.value);
    }


    return (
        isEdit ? <div><input type="text" onChange={handleChange}/><button onClick={() => saveTask(props.todoId)}>Save</button><button>Cancel</button></div> 
        : <div><h4>{props.todo}</h4><h4>Status: {props.status}</h4><button type="button" onClick={() => editTask(props.todoId, props.todo)}>Edit</button><button type="button" onClick={() => deleteTask(props.todoId)}>Delete</button></div>
    );
}


export default TodoItem;