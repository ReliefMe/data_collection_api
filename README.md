# Data collection API

## For Hospital
#### http://54.145.158.236:5000/add_user
Post request
Asks for following urlencoded values:

1) age | Number
2) gender | String
3) patient_id | String
4) smoker | String
5) reported_symptoms | Array
6) medical_history | Array
7) cough_audio | file
8) breath_audio | file
9) finger_video | file

![Screenshot](https://imgur.com/ZW2SPgv.png)
## For Deep learning researchers
#### http://54.145.158.236:5000/2020-04-21.csv 
Get request
Downloads CSV file containing patients of 21st April
![Screenshot](https://imgur.com/3lrE43O.png)
![Screenshot](https://imgur.com/jtIcmxi.png)
#### http://54.145.158.236:5000/get_users/by_date/2020-04-20
Get request
Sends a json response back containing patients of 20th April
![Screenshot](https://imgur.com/CMgsiC2.png)
#### background_service.js 
Generates a new csv file after every few minutes in background and overwrites the previous csv file from the same date. So that deep learning researches always get the latest csv file when send a get request to mydomain.com/2020-04-21.csv
