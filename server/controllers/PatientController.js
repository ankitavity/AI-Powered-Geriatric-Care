const patientModel = require("../models/patientModel")
const drModel=require("../models/DoctorModel")
const hospModel=require("../models/HospitalModel")
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
const LogModel=require("../models/LogModel")
const PrescriptionModel = require("../models/PrescriptionModel")
const ScheduleModel = require("../models/ScheduleTestModel")
//As axios post request made , here the inputs from form is pushed onto database
const registerController = async (req, res) => {
    try {
        const { email, password,hospitalEmail, doctorEmail } = req.body
        const user = await patientModel.findOne({ email });
        if (user) {
            return res.status(200).send({
                success: false,
                message: "User Exists"
            })
        }
        const hosp=await hospModel.findOne({email:hospitalEmail})
        if(!hosp)
        {
            return res.status(200).send({
                success:false,
                message:"Hospital doesnot exist"
            })
        }
        const drExist=await drModel.findOne({email:doctorEmail})
        if(!drExist)
        {
            return res.status(200).send({
                success:false,
                message:"Dr doesnot exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword

        const newUser = new patientModel(req.body);
        await newUser.save();
        return res.status(200).send({
            success: true,
            message: "Patient created successfully,Please login to continue.."
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

        const user = await patientModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "User not exists"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
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
            message: `Hello ${user.guardianName} now you can monitor from remote locations`,
            data: user,
        });


    }
    catch (error) {
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}
const sendEmail=async(req,res)=>{
    // console.log(req.body)
    const {email}=req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'geriatriccare92@gmail.com',
          pass: 'zomosvhpwgtrhtuc'
        }
      });
      
      const mailOptions = {
        from: 'geriatriccare92@gmail.com',
        to: email,
        subject: req.body.subject,
        text: req.body.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // console.log(error);
          res.status(400).send({success:false})
          
        } else {
            // console.log('Email sent: ' + info.response);
            res.status(200).send({success:true})
        }
      });
}
const getPatDetails =async (req,res)=>{
    try{
        // await necessary to give buffer time to load the data from the db else axioserror for no data avaliable will arise
        const id=req.body.id;
        // console.log(id);
        const patient= await patientModel.findById(id);
        const logsData=await LogModel.find({patientEmail:patient.email})
        const prescriptionData = await PrescriptionModel.find({patientEmail:patient.email})
        const testData = await ScheduleModel.findOne({patientEmail:patient.email})
        res.status(200).send({
            success:true,
            data:patient,
            logs:logsData,
            prescriptions:prescriptionData,
            tests:testData
        })
    }
    catch(error)
    {
       res.status(404).send({
        success:false,
        error
       })
    }
}
module.exports={
    loginController,
    registerController,
    sendEmail,
    getPatDetails
}