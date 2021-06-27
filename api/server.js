const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");

dotenv.config({ path: path.resolve(__dirname, ".env") }); // Import Config

const app = express(); // Create Express App

/* Security Configs */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// This sets various HTTP headers that can help defend against common web app security vulnerabilities, such as xss attacks.
app.use(hpp()); // This protects against HTTP Parameter Pollution attacks
app.use(morgan("tiny"));
/* Set Cookie Settings */
app.use(
  session({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
);

app.use(csurf()); // This protects against Cross-site request forgery. This needs to be used after our cookie-session connect.

const auth_routes = require("./routes/auth");
app.use("/auth", auth_routes);

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server" });
// });

app.listen(process.env.PORT, () => {
  console.log("PORT STARTED at", process.env.PORT);
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build", "index.html"));
  res.json({ message: "Error." });
});

module.exports = app;
