module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'loan',
        user: process.env.DB_USER || 'loan',
        password: process.env.DB_PASS || 'loan',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './loan.sqlite'
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'secretcode'
    }
}
