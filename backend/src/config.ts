export default () => ({
    jwt: {
        secret: process.env.secret_key
    },
    database: {
        host: process.env.host,
        port: process.env.port,
        username: process.env.user,
        password: process.env.password,
        database: process.env.database,
    }
})