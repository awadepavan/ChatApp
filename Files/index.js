const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

// Serve chat form, redirect to login if no username
router.get('/', (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.redirect('/login');
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat</title>
        </head>
        <body>
            <h1>Send Message</h1>
            <form action="/send" method="POST">
                <input type="hidden" name="username" id="username" value="${username}">
                <textarea name="message" placeholder="Type your message" required></textarea>
                <button type="submit">Send</button>
            </form>
            <h2>Messages:</h2>
            <pre id="messages"></pre>

            <script>
                async function loadMessages() {
                    const response = await fetch('/messages');
                    const messages = await response.text();
                    document.getElementById('messages').textContent = messages;
                }

                loadMessages();
                setInterval(loadMessages, 1000); // Refresh messages every second
            </script>
        </body>
        </html>
    `);
});

// Handle message sending
router.post('/send', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    const entry = `{"${username}": "${message}"},\n`;
    fs.appendFileSync('messages.txt', entry);
    res.redirect('/?username=' + username);
});

// Endpoint to read messages
router.get('/messages', (req, res) => {
    const messages = fs.readFileSync('messages.txt', 'utf8');
    res.send(messages);
});

module.exports = router;