const mongoose=require("mongoose")
const PatientLogSchema=new mongoose.Schema({
    patientEmail:{
        type:String,
        required:[true, 'Email is required']
    },
    type:{
        type:Number,
    },
    message:{
        type:String,
        required:true
    },
    value:
    {
        type:Number,
        required:true
    },
})
module.exports=mongoose.model("logPatient",PatientLogSchema)
