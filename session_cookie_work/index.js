const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= Session Middleware =================
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 minute
}));

// ================= Home Route =================
app.get('/', (req, res) => {
    res.send(`
        <h2>Home Page</h2>
        <a href="/login">Login Form</a><br>
        <a href="/session-json">Check Session (JSON)</a><br>
        <a href="/get-cookie">Check Cookie</a>
    `);
});

// ================= Login Form =================
app.get('/login', (req, res) => {
    res.send(`
        <h2>Login Form</h2>
        <form method="POST" action="/login">
            <input name="username" placeholder="Username" required /><br><br>
            <input name="role" placeholder="Role" required /><br><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// ================= Login POST (Form) =================
app.post('/login', (req, res) => {
    const { username, role } = req.body;

    // Set session
    req.session.user = { name: username, role: role };

    // Set cookie
    res.cookie('username', username, { maxAge: 60000 }); // 1 minute

    res.send(`
        <p>Session & Cookie set! Welcome ${username}, Role: ${role}</p>
        <a href="/get-session">Go to Session Info</a><br>
        <a href="/get-cookie">Check Cookie</a><br>
        <a href="/logout">Logout</a>
    `);
});

// ================= Login JSON POST =================
app.post('/login-json', (req, res) => {
    const { username, role } = req.body;

    // Set session
    req.session.user = { name: username, role: role };

    // Set cookie
    res.cookie('username', username, { maxAge: 60000 }); // 1 minute

    res.json({
        success: true,
        message: 'Session & Cookie set successfully via JSON',
        user: req.session.user
    });
});

// ================= Get Session =================
app.get('/get-session', (req, res) => {
    if (!req.session.user) {
        return res.send('No session found. Please login first.');
    }
    res.send(`
        <p>Hello ${req.session.user.name}, Role: ${req.session.user.role}</p>
        <a href="/logout">Logout</a>
    `);
});

// ================= Get Cookie =================
app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username || 'Guest';
    res.send(`<p>Hello ${username}, this is your cookie!</p>`);
});

// ================= Session JSON =================
app.get('/session-json', (req, res) => {
    if (!req.session.user) {
        return res.json({ loggedIn: false });
    }
    res.json({
        loggedIn: true,
        user: req.session.user
    });
});

// ================= Logout =================
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error destroying session');
        res.clearCookie('username'); // Clear the cookie
        res.send('Session & Cookie destroyed. You are logged out! <a href="/login">Login again</a>');
    });
});

// ================= Start Server =================
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
