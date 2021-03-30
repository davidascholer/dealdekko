const mongoose = require('mongoose');

const connectDB = async()=>{

    console.log('attempting to connect to mongo database...')
    try {
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log("couldn't connect to MongoDB : "+err);
        process.exit(1);
    }
}

module.exports = connectDB; 