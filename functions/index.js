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

           const result = await pool.query` select * from customer_offline_point`

            // Flatten the table
            console.log('Query result: ', result)

            let flattened = result.recordset

            // result
            //     .forEach(r => {
            //     console.log('Each time forEach strucks: ', r)
            //     flattened.push(
            //         {
            //             id: r.id,
            //             reward_card_id: r.reward_card_id,
            //             balance: r.balance,
            //         }
            //     )
            // })


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
            `UPDATE tnterp.dbo.customer_offline_point 
            SET balance = ${body.balance},
            reward_card_id=${body.reward_card_id} 
            WHERE id = ${body.id}`

return 'success!'

}
)
// exports.createProduct = functions.https.onCall(
//     async (body, context)=>{
//
//         try {
//             const pool = new sql.ConnectionPool(config)
//             await pool.connect()
//
//             const result = await pool.query` insert dst_e_productPrice`
//
//             //TODO: flatten the table
//
//             return result;
//         }
//         catch(e) {
//             console.log(e)
//         }
//     }
// )
