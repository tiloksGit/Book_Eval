const express = require("express")
const router = express.Router()
const RegisterNew = require("../Controllers/registerController")

router.route("/student").post(RegisterNew.addNewStudent)
router.route("/guide").post(RegisterNew.addNewGuide)


module.exports = router