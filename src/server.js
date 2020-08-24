const knex = require("knex");
const app = require('./app');
const { db, PORT } = require("./config.js");
const { initializeJobs } = require('./tasks/')
// const { betterLogger, getFunctionCallers } = require('./util/metaHelpers') //this line enables the awesome console.logs

// knex({
//   client: "mysql",
//   connection: {
//     host: db.HOST,
//     user: db.USER,
//     password: db.PASS,
//     database: db.DB_NAME
//   }
// });

// const { attachOnDuplicateUpdate } = require('knex-on-duplicate-update');
// attachOnDuplicateUpdate();

const  restServer = app.listen(PORT, console.log('Welcome to the MaTriX', PORT)); //For 
restServer.setTimeout(10000);


//setup chron jobs
initializeJobs({weather: true})




