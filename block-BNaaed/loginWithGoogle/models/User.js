var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var userSchema = new Schema( {
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
}, { timestamps: true } );

module.exports = mongoose.model( "User", userSchema );