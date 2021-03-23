const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        todo: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
    );

    const Task = model('Task', TaskSchema);

    module.exports = Task;