module.exports.config = {
    server_host: process.env.SERVER_HOST || 'localhost',
    server_port: process.env.SERVER_PORT,
    prefix_api: process.env.PREFIX_API || '/host/v1/api',

    secret_key: process.env.SECRET_KEY || 'SECRET_KEY',
    reset_password_token_expiry: '1h',

    mysql_db: {
        host: process.env.MYSQL_DB_HOST || 'localhost',
        user: process.env.MYSQL_DB_USER || 'root',
        password: process.env.MYSQL_DB_PASSWORD || '',
        database: process.env.MYSQL_DB_NAME || 'homestay',
        port: 3306,
        ssl: false
    },
    web: {
        client_id : process.env.WEB_CLIENT_ID,
        project_id: process.env.PROJECT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_secret: process.env.WEB_CLIENT_SECRET
    },
    facebook: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET
    }
};


