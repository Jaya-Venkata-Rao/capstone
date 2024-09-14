const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// In-memory storage for demonstration
const users = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page by default
app.get('/', (req, res) => {
    res.render('index', { showSignup: false });
});

// Serve the signup page
app.get('/signup', (req, res) => {
    res.render('index', { showSignup: true });
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.send('Username already exists. Please choose another.');
    }
    
    // Save the user data
    users.push({ username, password });
    res.send(`Signup successful for username: ${username}`);
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find the user
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.send(`Login successful for username: ${username}`);
    } else {
        res.send('Invalid username or password.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
