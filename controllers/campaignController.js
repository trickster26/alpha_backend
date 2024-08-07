const multer = require('multer'); // Import multer
const fs = require('fs'); // Import file system module
const csv = require('csv-parser'); // Import CSV parser module
const db = require('../config/db'); // Assuming you have a db.js file that exports a database connection

// Configure multer to save files to the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

// Controller to handle CSV uploads and database insertion
const uploadCSV = async (req, res) => {
  try {
    const results = [];

    // Read the uploaded file and parse it as CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Insert each record from the CSV into the database
        for (const recipient of results) {
          await db.query('INSERT INTO email_recipients (CompanyID, Email, FirstName, LastName) VALUES (?, ?, ?, ?)', [
            req.body.CompanyID,
            recipient.Email,
            recipient.FirstName,
            recipient.LastName,
          ]);
        }

        // Respond with a success message
        res.status(200).json({ message: 'CSV file processed successfully' });
      });
  } catch (error) {
    // Handle any errors that occur during processing
    res.status(500).json({ error: error.message });
  }
};

// Example function to get campaigns (replace with actual logic)
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await db.query('SELECT * FROM campaigns WHERE CompanyID = ?', [req.body.CompanyID]);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
module.exports = {
  getCampaigns,
  uploadCSV,
};

// In your routes file, you would use the `uploadCSV` function like this:
// router.post('/upload-csv', upload.single('file'), campaignController.uploadCSV);
