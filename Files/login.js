const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

// Serve login form
router.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
        </head>
        <body>
            <h1>Login</h1>
            <form action="/login" method="POST" onsubmit="saveUsername()">
                <input type="text" name="username" id="username" placeholder="Enter username" required>
                <button type="submit">Login</button>
            </form>
            <script>
                function saveUsername() {
                    const username = document.getElementById('username').value;
                    localStorage.setItem('username', username);
                }
            </script>
        </body>
        </html>
    `);
});

// Handle login and redirect to chat
router.post('/login', (req, res) => {
    const username = req.body.username;
    res.redirect('/?username=' + username);
});

module.exports = router;