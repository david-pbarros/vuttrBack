const passport = require("passport");
const passportJWT = require("passport-jwt");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

    let googleStrategy = new GoogleStrategy(
        {
            clientID: '172853201866-hodjlc4o784non7na52mbdip7do2n3ma.apps.googleusercontent.com',//GOOGLE_CLIENT_ID,
            clientSecret: 'hFeFrIx7EXuXehdNjPWkj0tC',//GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile.id);
            return done(null, profile);
        }
    );

    passport.use(strategy);
    passport.use(googleStrategy);

    // Used to stuff a piece of information into a cookie
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    return {
        secret: params.secretOrKey,
        initialize: function() {
            return passport.initialize();
        },
        authenticateJWT: function() {
            return passport.authenticate("jwt", {session: false});
        },
        authenticateGoogle: function() {
            //return passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });
            return passport.authenticate('google', { scope: ['profile'] });
        },
        googleCallBack: function() {
            return passport.authenticate('google', { failureRedirect: '/login' });
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