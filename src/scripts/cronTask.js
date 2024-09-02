const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration with placeholder values
const config = {
    apiUrl: 'https://jsonplaceholder.typicode.com/posts', // Mock API
    outputFilePath: path.join(__dirname, '..', '..', 'output', 'data.json'),
    logFilePath: path.join(__dirname, '..', '..', 'logs', 'cronTask.log')
};

// Helper function to log messages
function logMessage(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(config.logFilePath, logMessage);
}

// Function to fetch data from an API and save it to a file
async function fetchDataAndSave() {
    try {
        logMessage('Starting data fetch...');
        const response = await axios.get(config.apiUrl);
        fs.writeFileSync(config.outputFilePath, JSON.stringify(response.data, null, 2));
        logMessage('Data fetched and saved successfully.');
    } catch (error) {
        logMessage(`Error fetching data: ${error.message}`);
    }
}

// Ensure the output and log directories exist
function ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Ensure directories exist before running the cron job
ensureDirectoryExists(config.outputFilePath);
ensureDirectoryExists(config.logFilePath);

// Execute the cron task
(async function runCronTask() {
    logMessage('Cron job started.');
    await fetchDataAndSave();
    logMessage('Cron job completed.');
})();
