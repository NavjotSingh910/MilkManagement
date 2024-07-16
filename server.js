const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Endpoint to receive and save milk sales data
app.post('/saveMilkSales', (req, res) => {
    const saleData = req.body;

    // Read existing data from JSON file or initialize empty array
    let milkSales = [];
    const filePath = path.join(__dirname, 'milk_sales.json');
    
    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            if (fileData) {
                milkSales = JSON.parse(fileData);
            }
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read data file.' });
        return;
    }

    // Add new sale data
    milkSales.push(saleData);

    // Write updated data back to JSON file
    try {
        fs.writeFileSync(filePath, JSON.stringify(milkSales, null, 2));
        res.json({ message: 'Data saved successfully.' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save data.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
