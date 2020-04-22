const express = require("express")
const app = express()
const mongoose = require("mongoose")
const file_upload = require("express-fileupload")
let body_parser = require("body-parser")
let User = require("./user.model")
const fs = require('fs');
const { Parser } = require('json2csv');
app.use(express.static('public'))

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
        cough_audio: req.files.cough_audio.name,
        breath_audio : req.files.breath_audio.name,
        finger_video: req.files.finger_video.name
    });
    let audio_format = req.files.breath_audio.name;
    audio_format = audio_format.split(".")[1];
    let video_format = req.files.finger_video.name;
    video_format = video_format.split(".")[1];
    new_user.cough_audio = req.body.patient_id + "." + audio_format;
    new_user.breath_audio = req.body.patient_id + "." + audio_format;
    new_user.finger_video = req.body.patient_id + "." + video_format;
    console.log(new_user);
    let cough = req.files.cough_audio;
    let breath = req.files.breath_audio;
    let finger_video = req.files.cough_audio;

    new_user.save()
        .then((user) => {
            cough.mv("./cough/" + new_user.cough_audio, function (err, result) {
                if (err)
                    res.send({
                        message: "An error occured"
                    })
                else {
                    breath.mv("./breath/" + new_user.breath_audio, function (err, result) {
                        if (err)
                            res.send({
                                message: "An error occured"
                            })
                        else
                        finger_video.mv("./finger_video/" + new_user.finger_video, function (err, result) {
                            if (err)
                                res.send({
                                    message: "An error occured"
                                })
                            else
                                res.send({
                                    message: "user added"
                                })
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
    let date_array = req.params.date.split("-");
    let day = parseInt(date_array[2]);
    User.find({
        timestamp: {
            "$gte": new Date(`${req.params.date}T00:00:00.000Z`),
            "$lt": new Date(`${date_array[0]}-${date_array[1]}-${(day + 1)}T00:00:00.000Z`)
        }
    }, function (err, users) {
        if (err) res.send({message:"An error occured"});
        res.send({ "users": users })
    });
})


app.listen(3000, () => {
    console.log("I am up")
})