const mongoose=require("mongoose")
const PrescriptionSchema=new mongoose.Schema({
    patientEmail:{
        type:String,
        required:[true, 'Email is required']
    },
    diseaseName:{
        type:String,
    },
    medicine:{
        type:String,
        required:true
    },
    weeks:
    { 
        type:Number,
        // required:true 
    },
})
module.exports=mongoose.model("Prescription",PrescriptionSchema)
