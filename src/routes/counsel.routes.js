const express = require('express');

const router = express.Router();

const controller = require("../controllers/counsel.controller");

router.post("/", controller.create);
router.post("/:counsel_id/verify", controller.verify);
router.get("/:counsel_id", controller.read);
router.get("/", controller.load);
router.put("/:counsel_id", controller.update);
router.delete("/:counsel_id", controller.delete);

module.exports = router;