const mariadb = require('mariadb');
const fs = require('fs');

function GetJSONFileContents(confFile: string) {
    const rawdata = fs.readFileSync(confFile, 'utf8');

    const JSONData = JSON.parse(rawdata);

    return JSONData;
}

function DBConn() {
    let conn;
    const confFile = '../DBConf.json';
    //DBuser, DBPassword, DBName, ServerHost
    const confParameters = GetJSONFileContents(confFile);

    // const pool = mariadb.createPool({
    //     host: confParameters.ServerHost,
    //     user: confParameters.DBUser,
    //     password: confParameters.DBPassword,
    //     database: confParameters.DBName
    // });
    // console.log(pool);
    // try {
    //     conn = pool.getConnection();
    //     const rows = conn.query("SELECT 1 as val");
    //     console.log(rows); //[ {val: 1}, meta: ... ]
    //     const res = conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //     console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    // } catch (err) {
    //     throw err;
    // } finally {
    //     if (conn) return conn.end();
    // }

    
    // con.connect(function(err: string) {
    //     if (err) throw err;
    //         console.log("Connected!");
    // });
}

module.exports = { DBConn };
