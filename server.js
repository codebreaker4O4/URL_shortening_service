require("dotenv").config(); //Load configuration
const express = require("express"); //Express server
const connectDB = require("./config/db"); //Import database connection fuction
const cors = require("cors"); //Cross-origin resource sharing
const urlRoutes = require("./routes/urlRoutes"); //Import routes

const app = express();

connectDB();

app.use(express.json()); //Use JSON middleware
app.use(cors()); //Enable CORS

app.use("/", urlRoutes); //Mount URL routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
