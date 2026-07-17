const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/test", (req, res) => {
    res.send("Student Route Working");
});

router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.get("/profile", verifyToken, studentController.getProfile);
router.get("/", verifyToken, studentController.getAllStudents);
router.get("/:id", verifyToken, studentController.getStudentById);
router.put("/:id", verifyToken, studentController.updateStudent);
router.delete("/:id", verifyToken, studentController.deleteStudent);

module.exports = router;