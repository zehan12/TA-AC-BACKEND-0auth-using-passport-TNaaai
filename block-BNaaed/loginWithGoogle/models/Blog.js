const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var blogSchema = new Schema( {
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "public",
        enum: [ "public", "private" ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true } )

module.exports = mongoose.model( "Blog", blogSchema );