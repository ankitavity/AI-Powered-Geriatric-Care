const PrescriptionModel=require("../models/PrescriptionModel")
const addPrescribeController = async (req, res) => {
    console.log(req.body)
    try {
        const newPres = new PrescriptionModel(req.body);
        console.log(newPres);
        await newPres.save();
        return res.status(200).send({
            success: true,
            message: "Precription updated/created successfully."
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
const deletePrescribeController = async (req, res) => {
    try {
        
        await PrescriptionModel.findByIdAndDelete(req.body.prescriptionId);
        return res.status(200).send({
            success: true,
            message: "Precribed medicine deleted successfully."
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
module.exports={
    addPrescribeController,
    deletePrescribeController
}