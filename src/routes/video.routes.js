const express = require('express');

const router = express.Router();

const controller = require("../controllers/video.controller");

router.post("/", controller.create);
router.get("/:video_id", controller.read);
router.get("/", controller.load);
router.put("/:video_id", controller.update);
router.delete("/:video_id", controller.delete);

module.exports = router;