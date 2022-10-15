const mariadb = require('mariadb');
require('dotenv').config();
const fs = require('fs');

const pool = mariadb.createPool({
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.DB_NAME,
    // alloleva puudumisel saame JS jsoniks muutmisel errori: "TypeError: Do not know how to serialize a BigInt"
    supportBigNumbers: true
});

async function getDataFromDB(query: string) {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        // rows: [ {val: 1}, meta: ... ]
    
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        return rows;
    } catch (err) {
        console.log(`DB error: ${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
  }

// async function getDataFromDB(query: string) {
//     let conn;
//     let rows; 

//     // console.log(process.env);
//     const pool = mariadb.createPool({
//         host: process.env.APP_DB_HOST,
//         user: process.env.APP_DB_USER,
//         password: process.env.APP_DB_PASSWORD,
//         database: process.env.DB_NAME,
//         // alloleva puudumisel saame JS jsoniks muutmisel errori: "TypeError: Do not know how to serialize a BigInt"
//         supportBigNumbers: true
//     });

//     try {
//         conn = await pool.getConnection();
//         rows = await conn.query(query);
//         //console.log(rows); //[ {val: 1}, meta: ... ]
//         //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);

//         delete rows.meta;
//         //console.log(rows);
//     } catch (err) {
//         console.log(`DB error: ${err}`);
//         return err;
//     } finally {
//         if (conn) return conn.end();        
//     }
// }

function GetJSONFileContents(confFile: string) {
    const rawdata = fs.readFileSync(confFile, 'utf8');

    const JSONData = JSON.parse(rawdata);

    return JSONData;
}

export default getDataFromDB;
