const ScheduleModel=require("../models/ScheduleTestModel")

const updateTestController = async (req, res) => {
    try {
        console.log(req.body)
        const previousModel = await ScheduleModel.findOne({patientEmail: req.body.patientEmail});
        if(previousModel){
            if(previousModel.CBC){
                req.body.CBC = true
            }
            if(previousModel.LP){
                req.body.LP = true
            }
            if(previousModel.DT){
                req.body.DT = true
            }
            if(previousModel.CT){
                req.body.CT = true
            }
            if(previousModel.KFT){
                req.body.KFT = true
            }
            if(previousModel.LFT){
                req.body.LFT = true
            }
            await ScheduleModel.findOneAndUpdate({patientEmail: req.body.patientEmail}, req.body);
        }
        else{
            const newModel = new ScheduleModel(req.body);
            await newModel.save();
        }
        return res.status(200).send({
            success: true,
            message: "Test updated successfully."
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
module.exports={
    updateTestController
}