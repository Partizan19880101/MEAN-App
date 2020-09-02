const keys = require('../config/keys')
const passport = require('passport')
const JwtStraregy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStraregy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id')

            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        }catch (e){
            console.log(e)
        }
            
        })
    )
}