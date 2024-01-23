const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const { Pool } = require("pg");

const app = express();
const port = 8000;
const secretKey = "secret";
const dataFilePath = "data.json";
const connectionString =
  "postgres://your_username:your_password@localhost:5432/revenues"; // Change with your PostgreSQL connection details

const pool = new Pool({
  connectionString: connectionString,
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Middleware to check the Authorization header
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    console.log(secretKey);
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};

// POST endpoint with Authorization header check
app.post("/liveEvent", authenticateToken, async (req, res) => {
  const data = req.body.eventData;

  try {
    // Validate event fields
    const { userId, name, value } = eventData;
    if (!userId || !name || !value) {
      logger.error("Invalid event data - Missing required fields");
      return res
        .status(400)
        .json({ message: "Bad Request - Missing required fields" });
    }

    // Check if the file exists
    const fileExists = await fs
      .access(dataFilePath)
      .then(() => true)
      .catch(() => false);

    // If the file doesn't exist, create it with an empty array
    if (!fileExists) {
      await fs.writeFile(dataFilePath, "[]", "utf-8");
    }
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const existingData = JSON.parse(fileContent);

    // Add the new data to the existing data
    existingData.push(data);

    // Save the updated data back to the file
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(existingData, null, 2),
      "utf-8"
    );

    // Send a response
    res.status(200).json({ message: "Data received and saved successfully" });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET endpoint to retrieve user events from PostgreSQL
app.get("/userEvents/:userid", authenticateToken, async (req, res) => {
  const userId = req.params.userid;

  try {
    // Retrieve data from PostgreSQL database for the specified user
    const query = "SELECT * FROM your_table_name WHERE userId = $1";
    const result = await pool.query(query, [userId]);

    // Send the user data as JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
