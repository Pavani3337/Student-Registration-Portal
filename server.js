const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./backend/.env" });

const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Student Registration Portal API is Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});