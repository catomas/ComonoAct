const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    lastName: {
        type: String,
        required: [true, 'El apellido es necesario']
    },

    age: {
        type: Number,
        required: [true, 'La edad es necesaria']
    },

    sport: {
        type: String,
        required: [true, 'El deporte es necesario']
    }



});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model('Usuario', usuarioSchema);