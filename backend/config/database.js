const mongoose = require("mongoose");

const connectDatabase = ( ) => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true}).then((data) => {
        console.log(`Database connected successfully : ${data.connection.host}`);
    });
}

module.exports = connectDatabase;

