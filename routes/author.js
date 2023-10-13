const authorController = require("../controller/authorController")

const router = require("express").Router()

// ADD AUTHOR
router.post("/",authorController.addAuthor)

//GET ALL AUTHOR
router.get("/",authorController.getAllAuthor)

//GET AN AUTHOR
router.get("/:id",authorController.getAnAuthor)

// UPDATE AN AUTHOR
router.put("/:id",authorController.updateAnAuthor)

//DELETE AN AUTHOR
router.delete("/:id",authorController.deleteAnAuthor)

module.exports = router