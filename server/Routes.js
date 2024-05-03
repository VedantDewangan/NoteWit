const express = require("express")
const router = express.Router()
const { RegisterUser, AddNote, LoginUser, GetAllNotes, DeleteNote, EditNote, AddTask, GetAllTask, DeleteTask, editTask, GetUserData, VerifyPassword, ChangePassword } = require("./Controller");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/addNote", AddNote);
router.get("/getAllNotes", GetAllNotes);
router.delete("/deleteNote", DeleteNote);
router.put("/editNote", EditNote);
router.post("/addTask", AddTask);
router.get("/getAllTask", GetAllTask)
router.delete("/deleteTask", DeleteTask);
router.put("/editTask", editTask);
router.get("/getUserData", GetUserData);
router.get("/verifyPassword", VerifyPassword);
router.put("/changePassword", ChangePassword);

module.exports = router;