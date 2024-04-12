const express = require('express');

const router = express.Router();

const controller = require("../controllers/guide.controller");

router.post("/", controller.create);
router.get("/:guide_id", controller.read);
router.get("/", controller.load);
router.put("/:guide_id", controller.update);
router.delete("/:guide_id", controller.delete);

module.exports = router;