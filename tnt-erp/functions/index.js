const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const sql=require('mssql');
const config={
    user:'liuwenxuan',
    password:'120308032000qWe',
    server:'my-sql-dev-server.database.windows.net',
    database:'TnT ERP'
};
const pool=new sql.ConnectionPool(config)

exports.getERPdatabase=functions.https.onCall(
    async(body, context)=>{
        // await pool.connect()
        await sql.connect('mssql://liuwenxuan:120308032000qWe@my-sql-dev-server.database.windows.net/TnT ERP?encrypt=true')
        const result=await sql.query` select * from dbo.TnT ERP`;
        return result;
    }
)
