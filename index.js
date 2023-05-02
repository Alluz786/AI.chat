const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Create OpenAI API configuration object with API key from environment variable
const config = new Configuration({
    apiKey: process.env.API_TOKEN
});

// Create OpenAI API instance with configuration
const openai = new OpenAIApi(config);

// Define a route for the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Coding Nexus API');
});

// Define a route for the /message endpoint to handle incoming messages
app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.message,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });

    // Handle the response from OpenAI API
    response.then((data) => {
        const message = { message: data.data.choices[0].text };
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});

// Start the server listening on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));
