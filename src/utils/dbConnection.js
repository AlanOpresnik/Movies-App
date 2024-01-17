const mysql = require('mysql2/promise')
const dbConfig = require('../config/dbConfig')

class DBConnection {
    constructor() {
        this.pool = mysql.createPool({
            // Mas adelante hay que definir las configs
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async getConnection() {
        return this.pool.getConnection();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DBConnection();
        }
        return this.instance;
    }
}

module.exports = DBConnection;