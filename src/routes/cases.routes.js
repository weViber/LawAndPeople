const express = require('express');

const router = express.Router();

const controller = require("../controllers/cases.controller");

router.post("/", controller.create);
router.get("/:case_id", controller.read);
router.get("/", controller.load);
router.put("/:case_id", controller.update);
router.delete("/:case_id", controller.delete);
router.post("/search", controller.search);

module.exports = router;