const functions = require('firebase-functions');
const sql=require('mssql');
const config={
    user:'liuwenxuan',
    password:'120308032000qWe',
    server:'my-sql-dev-server.database.windows.net',
    database:'tnterp'
};


exports.getERPdatabase = functions.https.onCall(
    async (body, context)=>{

        try {
            const pool = new sql.ConnectionPool(config)
            await pool.connect()

           const result = await pool.query` select * from dst_e_productPrice`

            //TODO: flatten the table

            return result;
        }
        catch(e) {
            console.log(e)
        }
    }
)
