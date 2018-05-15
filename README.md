# Assesment_CustomerList

Customer List Simple React Firebase Web App

Demo link: [Here](https://propellerhead-99701.firebaseapp.com)

This is a simple ReactJS, Firebase and Bootstrap Customer list web app.
The app uses a realtime database to pull data from.
It is basically a serverless app since there are no complicated backend is needed.

The same database data can be found in the helper folder as Data.json

### Tech

This app uses a number of open source projects to work properly:

* [ReactJS](https://reactjs.org) - HTML enhanced for web apps!
* [Bootstrap](https://getbootstrap.com) -The world's most popular front-end component library.
* [ReactDataGrid](http://adazzle.github.io/react-data-grid/) Excel-like grid component built with React
* [Firebase](firebase.google.com) Backend as a service

### Installation

This app requires [Node.js](https://nodejs.org/) v5+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd project directory
$ npm install
$ nmp start
Browse  to localhost:3000
```

### Deploy/Run Scripts

* npm start (start locally on localhost:3000)
* npm run build (Generates a build for production deployment)
* npm run test (runs some tests)
* npm run deploy (deploy the build to firebase)

### Todos

* Pivot to Redux architecture for better state management and for better scaling
* Write MORE Tests
* Fix some small console warnings
* Work on Design: Currently it's really basic design
* Add more features : Add, delete, edit,authentication , etc..
