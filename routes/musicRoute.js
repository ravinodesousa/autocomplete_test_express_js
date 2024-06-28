const { Router } = require("express");
const { searchData } = require("../controllers/musicController");

const router = Router();

router.get("/", searchData);

module.exports = router;
