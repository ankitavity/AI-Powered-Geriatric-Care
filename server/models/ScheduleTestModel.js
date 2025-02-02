const mongoose=require("mongoose")
const ScheduleTestSchema=new mongoose.Schema({
    patientEmail:{
        type:String,
        required:[true, 'Email is required']
    },
    CBC:{
        type: Boolean
    },
    LP:{
        type: Boolean
    },
    DT:{
        type: Boolean
    },
    CT:{
        type: Boolean
    },
    KFT:{
        type: Boolean
    },
    LFT:{
        type: Boolean
    }
})
module.exports=mongoose.model("ScheduleTest",ScheduleTestSchema)
