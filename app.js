const express = require("express")
const app = express()
const mongoose = require("mongoose")
const file_upload = require("express-fileupload")
let body_parser = require("body-parser")
let User = require("./user.model")

app.use(express.json()); // Make sure it comes back as json
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(file_upload())

const db = "mongodb+srv://mnaufil:virufy@cluster0-wuuzb.mongodb.net/covid19?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongodb");
});

app.post("/add_user", (req, res) => {
    let new_user = new User({
        research_consent: req.body.research_consent,
        condition: req.body.condition,
        age_group: req.body.age_group,
        gender: req.body.gender,
        patient_id: req.body.patient_id,
        smoker: req.body.smoker,
        reported_symptoms: req.body.reported_symptoms,
        medical_history: req.body.medical_history,
        data_collected_using_smartphone: req.body.data_collected_using_smartphone,
        cough: req.files.cough.name,
        breath: req.files.breath.name
    });
    console.log(new_user);
    let cough = req.files.cough;
    let breath = req.files.breath;
    new_user.save()
        .then((user) => {
            cough.mv("./cough/" + cough.name, function (err, result) {
                if (err)
                    res.send({
                        message: "An error occured"
                    })
                else {
                    breath.mv("./breath/" + breath.name, function (err, result) {
                        if (err)
                            res.send({
                                message: "An error occured"
                            })
                        else
                            res.send({
                                message: "user added"
                            })
                    })
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.send({
                message: "couldn't add user"
            })
        })
})

app.get("/get_users/by_date/:date", (req, res) => {
    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    let date_array = req.params.date.split("-");
    let day = parseInt(date_array[2]);
    // console.log(`${date_array[0]}-${date_array[1]}-${(day+1)}`);
    User.find({
        timestamp: {
            "$gte": new Date(`${req.params.date}T00:00:00.000Z`),
            "$lt": new Date(`${date_array[0]}-${date_array[1]}-${(day + 1)}T00:00:00.000Z`)
        }
    }, function (err, users) {
        if (err) res.send({message:"An error occured"});
        // Prints "Space Ghost is a talk show host".
        res.send({ "users": users })
    });
})

app.listen(80, () => {
    console.log("I am up")
})