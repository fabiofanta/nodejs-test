const mongoose = require('mongoose');


const operationTypeSchema = mongoose.Schema({
    code: {
        type:String,
    },
    locations: {
        type:Array,
    },
    hasNotes: {
        type: Boolean,
    },
    label_it: {
        type:String,
    },
    category : {
        type:String,
    },
    visibility: Array,
    _id: String,
    createdAt : {
        type: String,
    },
    updatedAt :{
        type: String
    },
    __v: Number,
    discipline: String,
    numerosity: Number,
    isStudioOnly: Boolean,
    equipment_it: String,
    id: String

})


operationTypeSchema.pre('save', function( next ) {
    var operationType = this;
    next()
});


const OperationType = mongoose.model('operationType', operationTypeSchema);

module.exports = { OperationType }
