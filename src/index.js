const path = require("node:path");
const express = require("express");
const bodyParser = require("body-parser");
const webRoutes = require("./routes/web.js");

// Environment variables
const URL = process.env.URL || "0.0.0.0";
const PORT = process.env.PORT || 3000;

// Init Express
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Routes
app.use("/", webRoutes);

// Initialize server
app.listen(PORT, URL, () => console.log(`Server running on port: ${PORT}`));
