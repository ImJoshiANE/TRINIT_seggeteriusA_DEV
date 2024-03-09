const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { connectDB } = require("./config/db");

dotenv.config({ path: "./config.env" });

const server = require("./app");
// This file is the entry point for the program, and the contents it contain is solely related to server.

// Connecting Database
connectDB();

const port = process.env.PORT || 4000;

server.listen(port, (req, res) => {
  console.log(`Running Server on port ${port}`);
});
