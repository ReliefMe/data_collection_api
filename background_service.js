const mongoose = require('mongoose');
const { Parser } = require('json2csv');
const fs = require('fs');

var schedule = require('node-schedule');
const db = "mongodb+srv://mnaufil:virufy@cluster0-wuuzb.mongodb.net/covid19?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongodb");
});
let User = require("./user.model")
 
var j = schedule.scheduleJob({minute: 45}, function(){
    let dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    console.log("month length is {}",month.toString().length);
    if (month.toString().length == 1) {
        month = `0${month.toString()}`
    }
    let date = year + "-" + month + "-" + day;
    console.log(date)
    User.find({
        timestamp: {
            "$gte": new Date(`${date}T00:00:00.000Z`),
            "$lt": new Date(`${year}-${month}-${(day + 1)}T00:00:00.000Z`)
        }
    }, function (err, users) {
        if (err) console.log("An error occured");
        console.log(users)
        let fields = ["timestamp","_id","research_consent","condition","country","patient_location","age","patient_id","gender","smoker",,"reported_symptoms","medical_history","cough_audio","breath_audio","finger_video"];
        const parser = new Parser({
            fields,
        });
        
        let csv = parser.parse(users);
        fs.writeFile(`public/${date}.csv`, csv, function(err) {
            if (err) throw err;
            console.log('file saved');
          });
    });
});