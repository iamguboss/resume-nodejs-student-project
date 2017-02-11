var Schema = require('mongoose').Schema

var Student = Schema({
    id: Number,
    firstname: String,
    lastname: String,
    grade: String,
    score: Number
})

Student.plugin(autoIncrement.plugin, { model: 'Student', field: 'id', startAt: 1 });
module.exports = db.model('Student', Student)