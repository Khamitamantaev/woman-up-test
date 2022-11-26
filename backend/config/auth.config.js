module.exports = {
    access_secret: process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY: 'secret_key',
    jwtExpiration: process.env.NODE_ENV === 'production' ? 86400 : 60
};