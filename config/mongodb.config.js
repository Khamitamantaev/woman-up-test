module.exports = {
    MONGODB_URI: process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017/todos',
    INIT_USER: {
        USER_NAME: process.env.USER_NAME ? process.env.USER_NAME : 'khamitamantaevdev',
        EMAIL: process.env.USER_EMAIL ? process.env.USER_EMAIL : 'khamitamantaevdev@gmail.com',
        PASSWORD:  process.env.USER_PASSWORD ? process.env.USER_PASSWORD : 'passworddev123',
    }
};