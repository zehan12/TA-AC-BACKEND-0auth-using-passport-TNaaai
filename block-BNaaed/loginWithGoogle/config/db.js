const mongoose = require( "mongoose" );

const connectDB = async () => {
    try {
        const conn = await mongoose.connect( "mongodb+srv://zehan123:zehan123@cluster0.hi8gv.mongodb.net/loginWithGoogle?retryWrites=true&w=majority",{
            // useNEwUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        }) 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch ( err ) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;