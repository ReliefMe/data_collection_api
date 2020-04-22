const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let user_schema = new Schema({
    research_consent: {
        type: String
    },
    condition: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String
    },
    patient_id: {
        type: String
    },
    smoker: {
        type: String
    },
    reported_symptoms: {
        type: String
    },
    medical_history: {
        type: String
    },
    cough_audio: {
        type: String
    },
    breath_audio: {
        type: String
    },
    finger_video: {
        type: String
    },
    patient_location: {
        type: String
    },
    timestamp : { 
        type : Date, 
        default: new Date 
    }
});
module.exports = mongoose.model("User",user_schema)