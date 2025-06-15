const patientModel = require("../models/patientModel");
const drModel = require("../models/DoctorModel");
const hospModel = require("../models/HospitalModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const LogModel = require("../models/LogModel");
const PrescriptionModel = require("../models/PrescriptionModel");
const ScheduleModel = require("../models/ScheduleTestModel");
const predictDiseaseAndMedication = require("../controllers/prediction");

const SALT_ROUNDS = 10;
const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: "geriatriccare92@gmail.com",
    pass: "zomosvhpwgtrhtuc",
  },
};

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Register Controller
const registerController = async (req, res) => {
  try {
    const { email, password, hospitalEmail, doctorEmail } = req.body;

    // Input validation
    if (!email || !password || !hospitalEmail || !doctorEmail) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      !isValidEmail(email) ||
      !isValidEmail(hospitalEmail) ||
      !isValidEmail(doctorEmail)
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check existing user
    const existingUser = await patientModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    // Validate hospital and doctor
    const [hospital, doctor] = await Promise.all([
      hospModel.findOne({ email: hospitalEmail }),
      drModel.findOne({ email: doctorEmail }),
    ]);

    if (!hospital) {
      return res.status(404).send({
        success: false,
        message: "Hospital not found",
      });
    }

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new patientModel({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "Patient registered successfully. Please login to continue.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await patientModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).send({
      success: true,
      message: `Welcome ${user.guardianName}. You can now monitor remotely.`,
      data: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error during login",
    });
  }
};

// Send Email Controller
const sendEmail = async (req, res) => {
  try {
    const { email, subject, text } = req.body;

    if (!email || !subject || !text) {
      return res.status(400).send({
        success: false,
        message: "Email, subject, and text are required",
      });
    }

    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).send({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to send email",
    });
  }
};

// Get Patient Details Controller
const getPatDetails = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Patient ID is required",
      });
    }

    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(404).send({
        success: false,
        message: "Patient not found",
      });
    }

    // Parallel data fetching
    const [
      logsData,
      latestTemperature,
      latestSpO2,
      latestHeartRate,
      prescriptionData,
      testData,
    ] = await Promise.all([
      LogModel.find({ patientEmail: patient.email }),
      LogModel.find({ patientEmail: patient.email, type: 0 })
        .sort({ _id: -1 })
        .limit(1),
      LogModel.find({ patientEmail: patient.email, type: 1 })
        .sort({ _id: -1 })
        .limit(1),
      LogModel.find({ patientEmail: patient.email, type: 2 })
        .sort({ _id: -1 })
        .limit(1),
      PrescriptionModel.find({ patientEmail: patient.email }),
      ScheduleModel.findOne({ patientEmail: patient.email }),
    ]);

    const latestLogData = {
      Temperature: latestTemperature,
      SpO2: latestSpO2,
      HeartRate: latestHeartRate,
    };

    let prediction = {};
    if (
      latestLogData.Temperature.length &&
      latestLogData.SpO2.length &&
      latestLogData.HeartRate.length
    ) {
      prediction = predictDiseaseAndMedication(
        latestLogData.HeartRate[0].value,
        latestLogData.SpO2[0].value,
        latestLogData.Temperature[0].value,
        patient.dob,
        patient.gender,
        patient.diabetic,
        patient.hypertension
      );
    }

    return res.status(200).send({
      success: true,
      data: patient,
      logs: logsData,
      latestLogData,
      prescriptions: prescriptionData,
      prediction,
      tests: testData,
    });
  } catch (error) {
    console.error("Patient details error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error fetching patient details",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  sendEmail,
  getPatDetails,
};
