const mongoose = require("mongoose")

const connectDB = async (url) => {
    mongoose.set('strictQuery', true);

    await mongoose.connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log( err))
}
module.exports=connectDB

