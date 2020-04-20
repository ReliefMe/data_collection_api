const express = require("express")
const app = express()
const mongoose = require("mongoose")
const file_upload = require("express-fileupload")
let body_parser = require("body-parser")
let User = require("./user.model")
const fs = require('fs');
const { Parser } = require('json2csv');

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
        age: req.body.age,
        gender: req.body.gender,
        patient_id: req.body.patient_id,
        smoker: req.body.smoker,
        reported_symptoms: req.body.reported_symptoms,
        medical_history: req.body.medical_history,
        data_collected_using_smartphone: req.body.data_collected_using_smartphone,
        cough_audio: req.files.cough,
        breath_audio : req.files.breath
    });
    console.log(new_user);
    let cough = req.files.cough;
    let breath = req.files.breath;
    new_user.save()
        .then((user) => {
            cough.mv("./cough/" + req.body.patient_id, function (err, result) {
                if (err)
                    res.send({
                        message: "An error occured"
                    })
                else {
                    breath.mv("./breath/" + req.body.patient_id, function (err, result) {
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

app.get("/get_users/by_date/csv/:date", (req, res) => {
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
        // res.send({ "users": users })
        console.log(users)
        let fields = ["timestamp","_id","research_consent","condition","age","gender","patient_id","smoker","reported_symptoms","medical_history","data_collected_using_smartphone","cough","breath","__v"];
        const parser = new Parser({
            fields,
        });
        
        let csv = parser.parse(users);
        console.log(csv);
        fs.writeFile('cars.csv', csv, function(err) {
            if (err) throw err;
            console.log('cars file saved');
          });
        res.send({result:csv});
    });
});
    
app.listen(3000, () => {
    console.log("I am up")
})