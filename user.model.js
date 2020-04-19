const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let user_schema = new Schema({
    research_consent: {
        type: String
    },
    condition: {
        type: String,
    },
    age_group: {
        type: String,
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
    data_collected_using_smartphone: {
        type: String
    },
    cough: {
        type: String
    },
    breath: {
        type: String
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
});
module.exports = mongoose.model("User",user_schema)