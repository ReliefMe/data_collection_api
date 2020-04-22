# Virufy API

## For Hospital
#### http://139.59.0.87:3000/add_user
Post request
Asks for following urlencoded values:

1) condition   | String
2) age | Number
3) gender | String
4) patient_id | String
5) smoker | String
6) reported_symptoms | String
7) medical_history | String
8) cough_audio | file
9) breath_audio | file
10) finger_video | file
11) research_consent | String
12) patient_location | String
13) Country | String
![Screenshot](https://imgur.com/ZW2SPgv.png)
## For Deep learning researchers
#### http://139.59.0.87:3000/2020-04-21.csv 
Get request
Downloads CSV file containing patients of 21st April
![Screenshot](https://imgur.com/3lrE43O.png)
![Screenshot](https://imgur.com/jtIcmxi.png)
#### http://139.59.0.87:3000/get_users/by_date/2020-04-20
Get request
Sends a json response back containing patients of 20th April
![Screenshot](https://imgur.com/CMgsiC2.png)
#### background_service.js 
Generates a new csv file after every few minutes in background and overwrites the previous csv file from the same date. So that deep learning researches always get the latest csv file when send a get request to mydomain.com/2020-04-21.csv