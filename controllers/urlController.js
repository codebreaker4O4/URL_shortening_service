const shortid = require("shortid");
const URL = require("../models/urlModel");

//Shorten URL
exports.shortenURL = async (req, res) => {
  const { longUrl } = req.body;
  const shortCode = shortid.generate();
  const newUrl = new URL({ shortCode, longUrl });

  await newUrl.save();
  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
};

//Redirect to original URL
exports.redirectURL = async (req, res) => {
  const { shortCode } = req.params;
  const url = await URL.findOne({ shortCode });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  url.accessCount++;
  await url.save();
  res.redirect(url.longUrl);
};

//Update URL
exports.updateURL = async (req, res) => {
  const { shortCode } = req.params;
  const { longUrl } = req.body;

  const updatedURL = await URL.findOneAndUpdate(
    { shortCode },
    { longUrl },
    { new: true }
  );

  if (!updatedURL) {
    return res.status(404).json({ message: "URL not found" });
  }

  res.json(updatedURL);
};

//Delete URL
exports.deleteURL = async (req, res) => {
  const { shortCode } = req.params;

  const deletedURL = await URL.findOneAndDelete({ shortCode });

  if (!deletedURL) {
    return res.status(404).json({ message: "URL not found" });
  }

  res.json({ message: "URL deleted successfully" });
};

//Get statistics
exports.getStatistics = async (req, res) => {
  const { shortCode } = req.params;
  const url = await URL.findOne({ shortCode });

  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }
  const totalAccessCount = url.accessCount;

  res.json({ shortCode, longUrl: url.longUrl, accessCount: totalAccessCount });
};
