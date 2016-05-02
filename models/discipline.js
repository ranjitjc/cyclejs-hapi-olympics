var mongoose = require('mongoose');

var disciplineSchema = mongoose.Schema({

    disciplineId: String,
    disciplineName: String,
    sportId: String,
    disciplineImageUrl: String,

});

module.exports = mongoose.model('Discipline', catSchema);
