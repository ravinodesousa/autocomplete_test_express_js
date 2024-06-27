const express = require("express");
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
