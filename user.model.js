const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let user_schema = new Schema({
    research_consent: String,
    // condition: String,
    // age_group: String,
    // gender: String,
    // patient_id: String,
    // smoker: String,
    // reported_symptoms: String,
    // medical_history: String,
    // data_collected_using_smartphone: String,
    // date: Date.now()
});
module.exports = mongoose.model("User",user_schema)