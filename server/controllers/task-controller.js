const { Task } = require('../models');

const TaskController = {
    //create new task
    createTask({ body }, res) {
        Task.create(body)
            .then(taskData => {
                if(!taskData){
                    res.status(404).json({message: 'Unable to create a task'});
                    return;
                }
                res.json(taskData);
            })
            .catch(err => res.json(err));
    },
    // get all the tasks
    getTask(req, res) {
        Task.find({})
        .then(taskData => res.json(taskData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //delete tasks
    deleteTask({ params }, res) {
        Task.findOneAndDelete({ _id: params.id })
            .then(taskData => {
                if(!taskData){
                    res.status(404).json({message: 'No task found with this ID!'});
                    return;
                }
                res.json(taskData);
            })
            .catch(err => res.status(400).json(err));
    },
    //update task
    updateTask({ params, body }, res) {
        Task.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(taskData => {
            if(!taskData){
                res.status(404).json({message: 'No task found with this ID!'});
                return;
            }
            res.json(taskData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = TaskController;