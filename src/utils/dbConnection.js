const mysql = require('mysql2/promise')

class DBConnection {
    constructor() {
        this.pool = mysql.createPool({
            // Mas adelante hay que definir las configs
            host: '',
            user: '',
            password: '',
            database: '',
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