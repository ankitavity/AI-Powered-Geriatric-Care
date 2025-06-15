const mongoose=require('mongoose')
const PatientSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'It is required']
    },
    pName:{
        type:String,
        required: [true, 'Patient Name is required']
    },
    dob: {
        type: Date,
        required: [true, 'Patient DOB is required']
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, 'Patient gender is required']
    },
    diabetic: {
        type: Boolean,
        default: false
    },
    hypertension: {
        type: Boolean,
        default: false
    },
    address:{
        type:String,
        required: [true, 'Patient Address  is required for emergency']
    },
    guardianName:{
        type:String,
        required:[true, 'Guardian Name is required']
    },
    guardianPhone:{
        type:String,
        required:[true,"If not given then don't pucho kya hua?"]
    },
    hospitalEmail:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        // required:true
    },

},{timestamps:true})

module.exports=mongoose.model("patients",PatientSchema)