const passport = require("passport");
const passportJWT = require("passport-jwt");
const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;

module.exports = function() {
    let ExtractJwt = passportJWT.ExtractJwt;
    let Strategy = passportJWT.Strategy;
    let params = {
        secretOrKey: 'cfgjwtSecret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    let strategy = new Strategy(params, function(payload, done) {
        let id = payload.id || null;
    
        return done(null, {id: id});

        /*if (user) {
            return done(null, {id: user.id});
        
        } else {
            return done(new Error("User not found"), null);
        }*/
    });

    passport.use(strategy);

    return {
        secret: params.secretOrKey,
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session: false});
        }
    };
    
    
    /*passport.use(new GoogleStrategy({
            clientID: 172853201866-hodjlc4o784non7na52mbdip7do2n3ma.apps.googleusercontent.com,//GOOGLE_CLIENT_ID,
            clientSecret: hFeFrIx7EXuXehdNjPWkj0tC,//GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    ));*/
};