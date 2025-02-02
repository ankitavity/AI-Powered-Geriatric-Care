const mongoose=require("mongoose")
const DrSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'It is required']
    },
    drName:{
        type:String,
        required:true
    },
    drPhone:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("doctor",DrSchema)