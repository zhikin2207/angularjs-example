# Video Portal

## Running the application
Just run web-server.js from the application folder and navigate your browser to 'http://localhost:8000/www/index.html'

## Server
The server is a simple node server that just writes and reads files from the disk in a restful manner. 

## Login credentials
login: test  
password: test  

## Build application
npm install  
bower install  
gulp clean  
gulp build  

Mode of build depends on the field 'mode' in gulp.config.json and it can be 'debug' or 'release'