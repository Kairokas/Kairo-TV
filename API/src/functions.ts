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

export async function getDataFromDB(query: string, data:any | undefined) {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query, data);
        // rows: [ {val: 1}, meta: ... ]

        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

        if (rows.length === 0) {
            return;
        } else {
            // ei vaja metadatat
            delete rows.meta;
            //console.log(rows);
            return rows;
        }
    } catch (err) {
        console.log(`DB error: ${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

export async function insertDataToDB(query: string, data:any) {
    let conn;

    try {
        conn = await pool.getConnection();
        //const rows = await conn.query(query);
        // rows: [ {val: 1}, meta: ... ]

        const res = await conn.query(query, data);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        return res;
    } catch (err) {
        console.log(`DB error: ${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

export async function deleteDataFromDB(query: string, data:any[]) {
    let conn;

    try {
        conn = await pool.getConnection();
        //const rows = await conn.query(query);
        // rows: [ {val: 1}, meta: ... ]

        const res = await conn.query(query, data);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        return res;
    } catch (err) {
        console.log(`DB error: ${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

export async function updateDataInDB(query: string, data:any[]) {
    let conn;

    try {
        conn = await pool.getConnection();
        //const rows = await conn.query(query);
        // rows: [ {val: 1}, meta: ... ]

        const res = await conn.query(query, data);
        // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
        return res;
    } catch (err) {
        console.log(`DB error: ${err}`);
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

function GetJSONFileContents(confFile: string) {
    const rawdata = fs.readFileSync(confFile, 'utf8');

    const JSONData = JSON.parse(rawdata);

    return JSONData;
}
