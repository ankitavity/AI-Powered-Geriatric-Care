const mongoose = require("mongoose");

// Import the models (assuming they're in separate files)
const Patient = require("./models/patientModel"); // Adjust path as needed
const PatientLog = require("./models/LogModel"); // Adjust path as needed

// MongoDB connection
const mongoURI = "mongodb://192.168.1.17:27017/geriatricCare"; // Replace with your MongoDB URI

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Patient.deleteMany({});
    await PatientLog.deleteMany({});
    console.log("Cleared existing data");

    // Sample Patients
    const samplePatients = [
      {
        email: "john.doe@example.com",
        password: "hashedpassword123", // In production, this should be properly hashed
        pName: "John Doe",
        dob: new Date("1990-05-15"),
        gender: "male",
        diabetic: true,
        hypertension: false,
        address: "123 Main St, Springfield",
        guardianName: "Jane Doe",
        guardianPhone: "555-0123",
        hospitalEmail: "springfield.hospital@example.com",
        doctorEmail: "dr.smith@example.com",
      },
      {
        email: "mary.jane@example.com",
        password: "hashedpassword456",
        pName: "Mary Jane",
        dob: new Date("1985-08-22"),
        gender: "female",
        diabetic: false,
        hypertension: true,
        address: "456 Oak Ave, Rivertown",
        guardianName: "Peter Parker",
        guardianPhone: "555-0456",
        hospitalEmail: "rivertown.hospital@example.com",
        doctorEmail: "dr.jones@example.com",
      },
    ];

    // Insert patients
    const insertedPatients = await Patient.insertMany(samplePatients);
    console.log("Inserted sample patients:", insertedPatients.length);

    // Sample Patient Logs
    const sampleLogs = [
      {
        patientEmail: "john.doe@example.com",
        type: 1, // Could represent blood sugar reading
        message: "Morning blood sugar reading",
        value: 120,
      },
      {
        patientEmail: "john.doe@example.com",
        type: 2, // Could represent blood pressure
        message: "Evening blood pressure",
        value: 130,
      },
      {
        patientEmail: "mary.jane@example.com",
        type: 2,
        message: "Morning blood pressure",
        value: 140,
      },
      {
        patientEmail: "mary.jane@example.com",
        type: 3, // Could represent heart rate
        message: "Post-exercise heart rate",
        value: 85,
      },
    ];

    // Insert patient logs
    const insertedLogs = await PatientLog.insertMany(sampleLogs);
    console.log("Inserted sample logs:", insertedLogs.length);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeding function
seedDatabase();
