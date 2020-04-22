# Virufy API

## For Hospital
#### mydomain.com/add_user
Post request
Asks for following urlencoded values:

1) condition
2) age
3) gender
4) patient_id
5) smoker
6) reported_symptoms
7) medical_history
8) data_collected_using_smartphone
9) cough_audio
10) breath_audio
11) finger_video
12) research_consent
13) patient_location
![Screenshot](https://imgur.com/ZW2SPgv.png)
## For Deep learning researchers
#### mydomain.com/2020-04-21.csv 
Get request
Downloads CSV file containing patients of 21st April
![Screenshot](https://imgur.com/3lrE43O.png)
![Screenshot](https://imgur.com/jtIcmxi.png)
#### mydomain.com/get_users/by_date/2020-04-20
Get request
Sends a json response back containing patients of 20th April
![Screenshot](https://imgur.com/CMgsiC2.png)
#### background_service.js 
Generates a new csv file after every few minutes in background and overwrites the previous csv file from the same date. So that deep learning researches always get the latest csv file when send a get request to mydomain.com/2020-04-21.csv