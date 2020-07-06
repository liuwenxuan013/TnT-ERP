const functions = require('firebase-functions');
const sql=require('mssql');
const config={
    user:'liuwenxuan',
    password:'120308032000qWe',
    server:'my-sql-dev-server.database.windows.net',
    database:'Dictionary'
};


exports.getERPdatabase = functions.https.onCall(
    async (body, context)=>{

        try {
            const pool = new sql.ConnectionPool(config)
            await pool.connect()

           const result = await pool.query` select * from dictionary`

            // Flatten the table
            console.log('Query result: ', result)

            let flattened = result.recordset

            return flattened
        }
        catch(e) {
            console.log(e)
        }
    }
)
exports.updateRecord=functions.https.onCall(
    async (body,context)=>{
        console.log(body)
        const pool = new sql.ConnectionPool(config)
        await pool.connect()
        const result = await pool.query
            `UPDATE dictionary.dbo.dictionary
            SET term = ${body.term},
            def=${body.def} ,
            addition=${body.addition}
            WHERE id = ${body.id}`

return 'success!'

}
)

