const express = require("express")
const router = express.Router()
const RegisterNew = require("../Controllers/registerController")
const PanelController = require("../Controllers/panelController")

router.route("/student").post(RegisterNew.addNewStudent)
router.route("/guide").post(RegisterNew.addNewGuide)
router.route("/panel").post(PanelController.addPanel)


module.exports = router