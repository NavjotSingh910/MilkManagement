const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Initialize milk sales data array
let milkSalesData = [];

// Initialize buyers data array
let buyersData = [];

// Load initial data from files
loadMilkSalesDataFromFile();
loadBuyersDataFromFile();

// Endpoint to receive and save milk sales data
app.post('/saveMilkSales', (req, res) => {
    const saleData = req.body;

    // Add new sale data
    milkSalesData.push(saleData);

    // Save the updated data to a JSON file
    saveMilkSalesDataToFile();

    res.json({ message: 'Milk sale data saved successfully.' });
});

// Endpoint to fetch milk sales data
app.get('/getMilkSales', (req, res) => {
    res.json(milkSalesData);
});

// Endpoint to handle buyer registration
app.post('/registerBuyer', (req, res) => {
    const newBuyer = req.body;

    // Generate a unique ID
    const newId = buyersData.length + 1;
    newBuyer.id = newId;

    // Add the buyer to the data array
    buyersData.push(newBuyer);

    // Save the updated data to a JSON file
    saveBuyersDataToFile();

    // Send the new buyer ID as response
    res.status(201).json({ message: `Welcome, ${newBuyer.name}! Your ID is ${newId}.`, id: newId });
});

// Endpoint to fetch all buyers data
app.get('/buyers', (req, res) => {
    res.json(buyersData);
});

// Function to save milk sales data to a JSON file
function saveMilkSalesDataToFile() {
    const filePath = path.join(__dirname, 'milk_sales.json');

    try {
        fs.writeFileSync(filePath, JSON.stringify(milkSalesData, null, 2));
        console.log('Milk sales data saved successfully.');
    } catch (err) {
        console.error('Failed to save milk sales data:', err);
    }
}

// Function to save buyers data to a JSON file
function saveBuyersDataToFile() {
    const filePath = path.join(__dirname, 'buyers_data.json');

    try {
        fs.writeFileSync(filePath, JSON.stringify(buyersData, null, 2));
        console.log('Buyers data saved successfully.');
    } catch (err) {
        console.error('Failed to save buyers data:', err);
    }
}

// Function to load milk sales data from a JSON file on server start
function loadMilkSalesDataFromFile() {
    const filePath = path.join(__dirname, 'milk_sales.json');

    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            milkSalesData = JSON.parse(fileData);
            console.log('Milk sales data loaded successfully.');
        }
    } catch (err) {
        console.error('Failed to load milk sales data:', err);
    }
}

// Function to load buyers data from a JSON file on server start
function loadBuyersDataFromFile() {
    const filePath = path.join(__dirname, 'buyers_data.json');

    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            buyersData = JSON.parse(fileData);
            console.log('Buyers data loaded successfully.');
        }
    } catch (err) {
        console.error('Failed to load buyers data:', err);
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
