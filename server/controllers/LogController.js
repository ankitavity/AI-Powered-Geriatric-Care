const LogModel=require("../models/LogModel")
const pushController = async (req, res) => {
    try {
        const newLog = new LogModel(req.body);
        await newLog.save();
        return res.status(200).send({
            success: true,
            message: "Log  pushed successfully."
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
module.exports={
    pushController
}