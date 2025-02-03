const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.shortenURL);
router.get("/:shortCode", urlController.redirectURL);
router.put("/update/:shortCode", urlController.updateURL);
router.delete("/delete/:shortCode", urlController.deleteURL);
router.get("/stats/:shortCode", urlController.getStats);

module.exports = router;
