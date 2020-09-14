module.exports = {
    mongoURI: process.env.mongoURI,
    mongoSettings: {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    jwt: process.env.jwt
}