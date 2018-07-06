# Express App
- npm init
- npm install --save express ejs
- create .gitignore and add node_modules, .env
- create express app.js
- add start to package.json scripts object // "start": "node app.js"

#Environment variables
- npm install dotenv --save
- create a .env file
- add variables to the .env file. For example
PORT=3000
IP=0.0.0.0
DATABASEURL=mongodb://localhost/yelp_camp

# GIT
- git init or git clone repo
- git add .
- git commit -m "first commit"

# Heroku CLI
- heroku login
- Enter email
- Enter password
- heroku create example-83333 //or leave blank to get a generic name
- git remote -v //check remote
- git push heroku master
- heroku logs // to check if there were any errors when uploading
- heroku run ls //check the files on heroku
- heroku config:set DATABASEURL=mongodb://<dbuser>:<dbpassword>@ds249530.mlab.com...



