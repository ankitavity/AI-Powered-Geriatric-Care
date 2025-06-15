function predictDiseaseAndMedication(
  heartRateRecorded,
  spo2Recorded,
  temperatureRecorded,
  dobRecorded,
  genderRecorded,
  hasDiabetes = false,
  hasHypertension = false
) {
  let disease = null;
  let medication = null;
  let severity = "mild";
  let additionalAdvice = "";

  console.log("Date: ", new Date());

  // Calculate age from dobRecorded
  const dob = new Date(dobRecorded);
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs);
  let age = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Convert inputs to appropriate types
  let heartRate = parseFloat(heartRateRecorded);
  let spo2 = parseFloat(spo2Recorded);
  let temperature = parseFloat(temperatureRecorded);
  gender = String(genderRecorded).toLowerCase();

  console.log(
    heartRateRecorded,
    spo2Recorded,
    temperatureRecorded,
    age,
    gender
  );

  // Check for fever conditions
  if (temperature >= 38.0) {
    if (temperature >= 39.5) {
      severity = "severe";
      additionalAdvice = "Seek immediate medical attention.";
    } else if (temperature >= 38.5) {
      severity = "moderate";
      additionalAdvice = "Rest and monitor symptoms closely.";
    }

    // Check for potential flu or COVID-19
    if (heartRate > 100 && spo2 < 95) {
      if (spo2 < 92) {
        disease = "Possible pneumonia or severe respiratory infection";
        medication =
          "Seek immediate medical attention for proper diagnosis and treatment";
        severity = "severe";
      } else {
        disease = "Possible influenza or COVID-19";
        medication =
          "Acetaminophen/Paracetamol for fever. Consider testing for COVID-19.";
      }
    } else {
      disease = "Possible fever";
      medication = "Acetaminophen/Paracetamol or Ibuprofen for fever reduction";
    }
  }

  // Check for potential heart conditions
  else if (heartRate > 100) {
    if (age > 60 && hasHypertension) {
      disease = "Possible tachycardia, consider cardiac issues";
      medication =
        "Consult cardiologist. Possible beta-blockers if prescribed.";
      severity = "moderate";
      additionalAdvice = "Reduce physical exertion and stress.";
    } else {
      disease = "Elevated heart rate";
      medication = "Rest, hydration, and monitoring";
      additionalAdvice =
        "Could be due to stress, caffeine, or physical activity.";
    }
  }

  // Check for potential respiratory conditions
  else if (spo2 < 95) {
    if (spo2 < 90) {
      disease = "Severe hypoxemia";
      medication =
        "Seek immediate medical attention, oxygen therapy may be required";
      severity = "severe";
    } else {
      disease = "Mild hypoxemia";
      medication = "Monitor oxygen levels. Consider consulting a doctor.";
      severity = "moderate";
      additionalAdvice = "Avoid high altitudes and smoking.";
    }
  }

  // Check for hypotension (using heart rate as proxy)
  else if (heartRate < 60 && !(age < 30 && gender === "male")) {
    disease = "Possible bradycardia";
    if (age > 65) {
      medication = "Consult cardiologist for evaluation";
      severity = "moderate";
    } else {
      medication = "Monitor and consult healthcare provider if symptoms occur";
      additionalAdvice = "Note any dizziness or fatigue.";
    }
  }

  // Special case for diabetic patients
  else if (hasDiabetes && temperature > 37.5) {
    disease = "Possible infection (higher risk for diabetic patients)";
    medication = "Monitor blood glucose closely. Consider consulting doctor.";
    additionalAdvice = "Increase fluid intake unless contraindicated.";
  }

  // Normal conditions
  else {
    disease = "No acute concerns detected";
    medication = "No specific medication needed";
    severity = "normal";
    additionalAdvice = "Continue regular health maintenance.";
  }

  // Age-specific adjustments
  if (age < 12 && medication && medication.includes("Ibuprofen")) {
    medication = medication.replace("Ibuprofen", "children's Ibuprofen dosage");
    additionalAdvice += " Consult pediatrician for proper dosing.";
  }

  if (age > 65 && medication && medication.includes("Ibuprofen")) {
    additionalAdvice +=
      " Elderly patients should use NSAIDs with caution due to increased risk of side effects.";
  }

  return {
    predictedDisease: disease,
    recommendedMedication: medication,
    severity: severity,
    additionalAdvice: additionalAdvice,
    disclaimer:
      "This is a simplified prediction system and does not replace professional medical diagnosis. Always consult a healthcare provider.",
  };
}

module.exports = predictDiseaseAndMedication;
