# Cravings Web Application
CS 321 Group 3's main github repository.

## Installation

First, clone the repository
```
git clone https://github.com/Ryandunn399/cravings-app.git
```
Then you need to cd into the client and server subdirectories and run this command
```
npm install
```
This will install any of the node libraries we are utilizing for the project.

# Running the Webserver
The project is using vite in order to run the development web server for react.  If you want to run the frontend of the website, run this command inside the client subdirectory
```
npm run dev
```
This will provide you with a localhost address and a specific port.  You can load the webpage by copying the localhost address into a web browser.

To run the express server, simply type this command inside the server subdirectory
```
node server.js
```
