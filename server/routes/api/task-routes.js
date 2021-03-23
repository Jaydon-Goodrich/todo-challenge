const router = require('express').Router();
const {
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../../controllers/task-controller');

router.route('/')
.get(getTask)
.post(createTask)

router.route('/:id')
.put(updateTask)
.delete(deleteTask)

module.exports = router;