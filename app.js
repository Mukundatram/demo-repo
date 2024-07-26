const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint for handling sign up form submission
app.post('/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Create an object with user data
        const userData = {
            name,
            email,
            password
        };

        // Read existing data from local storage (if any)
        let users = [];
        try {
            const data = fs.readFileSync('users.json');
            users = JSON.parse(data);
        } catch (error) {
            // If there's an error reading the file, assume it's empty or doesn't exist
        }

        // Add new user data to the array
        users.push(userData);

        // Write the updated array back to local storage
        fs.writeFileSync('users.json', JSON.stringify(users));

        // Respond with success message
        res.send('User signed up successfully!');
    } catch (error) {
        console.error('Error occurred while processing signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
