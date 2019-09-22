import { Pool } from "./services/node_modules/mysql";

const mysql = require('mysql')

class DBPool {

    pool: Pool

    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: 'mysqlroot',
            database: 'channel_manager_1_4'
        })
        this.check_db_errors()
    }

    check_db_errors() {
        this.pool.getConnection((err:any, connection:any) => {
            if(err) {
                if(err.code==='PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if(err.code==='ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if(err.code==='ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            } else {
                console.log('Database connection pool successfully created!')
            }
            if(connection) {
                connection.release()
            }
            return
        })
    }
}

export default new DBPool().pool