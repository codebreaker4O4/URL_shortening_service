const mongoose = require("mongoose"); //Import the mongoose module

const urlSchema = new mongoose.Schema(
  {
    shortcodes: String, //Unique short url
    longUrl: String, //Original long url
    accessCount: { type: Number, default: 0 }, //Number of accesses
  },
  { timestamps: true }
); //Automatically add timestamps

module.exports = mongoose.model("URL", urlSchema); //Export the URL model
