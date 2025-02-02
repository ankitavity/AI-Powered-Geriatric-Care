const HospitalModel = require("../models/HospitalModel")
const PatientModel=require("../models/patientModel")
const bcrypt = require('bcryptjs')

const registerController = async (req, res) => {
    try {
        const { email, password } = req.body
        const hosp = await HospitalModel.findOne({ email });
        if (hosp) {
            return res.status(200).send({
                success: false,
                message: "Hospital Exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword

        const newUser = new HospitalModel(req.body);
        await newUser.save();
        return res.status(200).send({
            success: true,
            message: "Hospital account created successfully,Please login to continue.."
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
const loginController = async (req, res) => {
    try {

        const hospital = await HospitalModel.findOne({ email: req.body.email })
        if (!hospital) {
            return res.status(200).send({
                success: false,
                message: "hospital reference not exists"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, hospital.password)
        if (!validPassword) {
            return res.status(200).send({
                success: false,
                message: "Invalid credential"
            })
        }

        //    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: "1d",
        //   });
        return res.status(200).send({
            success: true,
            message: `Hello ${hospital.HospName} now you can monitor from remote locations`,
            data: hospital,
        });


    }
    catch (error) {
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}
const getPatDetails=async(req,res)=>{
    try{
     const email=req.body.email
    //  console.log(email);
     const patients=await PatientModel.find({ hospitalEmail:email})
    //  console.log(patients)
      return res.status(200).send({
        success: true,
        data:patients
    })
    }catch(error)
    {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
module.exports={
    loginController,
    registerController,
    getPatDetails
}