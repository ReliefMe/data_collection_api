# Virufy API

## For Hospital
mydomain.com/add_user | Post request | Asks for following urlencoded values
condition, age, gender, patient_id, smoker, reported_symptoms, medical_history, data_collected_using_smartphone, cough_audio, breath_audio

## For Deep learning researchers
mydomain.com/2020-04-21.csv | Get request | downloads CSV file containing patients of 21st April
mydomain.com/get_users/by_date/2020-04-21 | Get request | sends a json response back containing patients of 21st April

background_service.js generates a new csv file after every few minutes in background and overwrites the previous csv file from the same date. So that deep learning researches always get the latest csv file when send a get request to mydomain.com/2020-04-21.csv