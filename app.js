const express = require("express")
const app = express()
const mongoose = require("mongoose")
let body_parser = require("body-parser")
let User = require("./user.model")
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended:true
}));
const db = "mongodb+srv://mnaufil:<password>@cluster0-wuuzb.mongodb.net/covid19?retryWrites=true&w=majority";
mongoose.connect(db,{ useNewUrlParser: true},()=>{
    console.log("connected to mongodb");
});
app.post("/",(req,res)=>{
    let new_user = new User();
    new_user.research_consent = req.body.research_consent;
    // new_user.condition = req.body.condition;
    // new_user.age_group = req.body.age_group;
    // new_user.gender = req.body.gender;
    // new_user.patient_id = req.body.patient_id;

    // new_user.smoker = req.body.smoker;
    // new_user.reported_symptoms = req.body.reported_symptoms;
    // new_user.medical_history = req.body.medical_history;
    // new_user.data_collected_using_smartphone = req.body.data_collected_using_smartphone;
    console.log(new_user);
    new_user.save(function(err,user){
        if (err){
            res.send("Error in saving a user");
        }
        else {
            console.log(user);
            res.send(user);
        }
    })
})
app.listen(3000,()=>{
    console.log("I am active")
})