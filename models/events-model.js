const { Schema, model } = require('mongoose');

const eventsSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    //Usamos una referencia para identificar el usuario que creo la nota.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }
});

eventsSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Events', eventsSchema );