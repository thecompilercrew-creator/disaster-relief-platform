require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const auth = require("./middleware/auth.js");
const Request = require('./models/request.js');
const geminiRoutes = require('./routes/gemini.js');
const feedRoutes = require("./routes/feeds.js");

connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/requests", require("./routes/requests.js"));
app.use("/api/resources", require("./routes/resources.js"));
app.use("/api/volunteer", require("./routes/volunteer.js"));
app.use("/api/feeds", feedRoutes);
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get("/", (req, res) => {
  res.send("Disaster Relief Backend is running 🚀");
});



















