const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = new (require('../../db'))(); // Instantiate a database connection
const crypto = require('crypto');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Here you would look up the user in your database
  // For now, we'll just return a dummy user
  done(null, {id: id, name: "Dummy"});
});

// Register strategy
// Register strategy
passport.use("register", new LocalStrategy(
    { // TODO change name of fields once front end is updated
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async function (req, email, password, done) {
        const { fname, lname } = req.body;

        // Hash the password
        password = crypto.createHash('sha256').update(password).digest('hex');

        const values = [fname, lname, email, password];
        const query = "INSERT INTO employees (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const res = await db.query(query, values);

        // If the query fails, return an error
        if (res === false || res.rows.length === 0) return done(null, false, {message: "Database error"});

        return done(null, res.rows[0]);
    }
));

// Login strategy
passport.use("login", new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async function (req, email, password, done) {
        // Hash the password
        password = crypto.createHash('sha256').update(password).digest('hex');

        const values = [email, password];
        const query = "SELECT * FROM employees WHERE email = $1 AND password = $2";

        const res = await db.query(query, values);
        console.log(res.rows, values);

        // If the query fails, return an error message
        if (res === false) return done(null, false, {message: "Database error"});
        if (res.rows.length === 1) {
            return done(null, res.rows[0])
        } else {
            return done(null, false, {message: "Invalid credentials"})
        }
    }
));

module.exports = passport;