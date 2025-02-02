const mongoose=require("mongoose")
const HospSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'It is required']
    },
    HospName:{
        type:String,
        required:true
    },
    HospAddress:{
        type:String,
        required:true
    },
    HospPhone:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("hospital",HospSchema)
