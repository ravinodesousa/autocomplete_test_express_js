const { Router } = require("express");
const {
  getAutocompleteSuggestions,
  getSearchedData,
} = require("../controllers/musicController");

const router = Router();

router.get("/search/autocomplete", getAutocompleteSuggestions);
router.get("/search/result", getSearchedData);

module.exports = router;
