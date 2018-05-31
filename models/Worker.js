const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const WorkerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
});

module.exports = Worker = mongoose.model('workers', WorkerSchema);