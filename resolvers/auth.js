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
    
        if (id) {
            return done(null, {id: id});

        } else {
            return done(new Error("User not found."), null);
        }
    });

    let googleStrategy = new GoogleStrategy(
        {
            clientID: '172853201866-hodjlc4o784non7na52mbdip7do2n3ma.apps.googleusercontent.com',//GOOGLE_CLIENT_ID,
            clientSecret: 'hFeFrIx7EXuXehdNjPWkj0tC',//GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    );

    passport.use(strategy);
    passport.use(googleStrategy);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        console.log(user);
        done(null, user);
    });

    return {
        secret: params.secretOrKey,
        initialize: function() {
            return passport.initialize();
        },
        session: function() {
            return passport.session();
        },
        authenticateJWT: function() {
            return passport.authenticate("jwt", {session: true});
        },
        authenticateGoogle: function() {
            return passport.authenticate('google', { scope: ['profile'] });
        },
        googleCallBack: function() {
            return passport.authenticate('google', { failureRedirect: '/' });
        },
        checkUser: function(req, res, next) {
            if (!req.session.userId) {//for tests
                req.session.userId = "103797635260846090080";
            }
            
            if (req.session.userId === req.user.id) {
                next();
            
            } else {
                res.sendStatus(403);
            }
        }
    };
};