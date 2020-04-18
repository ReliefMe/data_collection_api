const express = require("express")
const app = express()
const mongoose = require("mongoose")
let body_parser = require("body-parser")
let User = require("./user.model")
app.use(express.json()); // Make sure it comes back as json
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended: true
}));
const db = "mongodb+srv://mnaufil:<password>@cluster0-wuuzb.mongodb.net/covid19?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongodb");
});
app.post("/", (req, res) => {
    let new_user = new User({
        research_consent: req.body.research_consent,
        condition : req.body.condition,
        age_group : req.body.age_group,
        gender : req.body.gender,
        patient_id : req.body.patient_id,
        smoker : req.body.smoker,
        reported_symptoms : req.body.reported_symptoms,
        medical_history : req.body.medical_history,
        data_collected_using_smartphone : req.body.data_collected_using_smartphone,
    });
    new_user.save()
        .then((user) => res.send(user))
        .catch((err) => console.log(err))

})
app.listen(3000, () => {
    console.log("I am active")
})