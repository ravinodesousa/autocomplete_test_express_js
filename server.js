const express = require("express");
const app = express();
const musicRoute = require("./routes/musicRoute");

// Define a port number
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(musicRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
