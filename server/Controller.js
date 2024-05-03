const { User, Note, Task } = require("./Modle");
var bcrypt = require('bcryptjs');
require("dotenv").config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

const RegisterUser = async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    try {
        const EmailUser = await User.findOne({
            email: email
        });
        if (!EmailUser) {
            if (password.length < 7) {
                res.send({
                    msg: "password should consist atleast 8 character",
                    register: false
                })
            }
            else {
                if (password === confirm_password) {

                    const HashedPassword = await bcrypt.hash(password, 12);

                    const newUser = await User.insertMany([{
                        username: username,
                        email: email,
                        password: HashedPassword
                    }])
                    res.send({
                        register: true,
                        id: newUser[0]._id
                    })
                }
                else {
                    res.send({
                        msg: "password and confirm passwprd should be same",
                        register: false
                    })
                }
            }
        }
        else {
            res.send({
                msg: "Email already registred",
                register: false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const EmailUser = await User.findOne({
            email: email
        })

        if (EmailUser) {
            if (await bcrypt.compare(password, EmailUser.password)) {
                res.send({
                    login: true,
                    id: EmailUser._id
                })
            }
            else {
                res.send({
                    msg: "Incorrect Password",
                    login: false
                })
            }
        }
        else {
            res.send({
                msg: "Email not registerd",
                login: false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const AddNote = async (req, res) => {
    const { noteTitle, noteContent, userId } = req.body;

    const encryptedNoteTitle = cryptr.encrypt(noteTitle);
    const encryptedNoteContent = cryptr.encrypt(noteContent);

    await Note.insertMany({
        noteTitle: encryptedNoteTitle,
        noteContent: encryptedNoteContent,
        noteCreated: new Date(Date.now()),
        user: userId
    })

    res.send({
        msg: "Note Added Successfully",
        add: true
    })
}

const GetAllNotes = async (req, res) => {
    const { id } = req.query;
    var AllEncryptedNote = await Note.find({
        user: id
    })
    AllEncryptedNote.forEach(note => {
        note.noteContent = cryptr.decrypt(note.noteContent);
        note.noteTitle = cryptr.decrypt(note.noteTitle);
    });
    res.send(AllEncryptedNote);
}

const DeleteNote = async (req, res) => {
    const { id } = req.query;
    await Note.deleteOne({
        _id: id
    })
    res.send({
        delete: true,
        msg: "Note Deleted Successfully"
    })
}

const EditNote = async (req, res) => {
    const { newNoteTitle, newNoteContent, noteId } = req.body

    const encryptedNewNoteTitle = cryptr.encrypt(newNoteTitle);
    const encryptedNewNoteContent = cryptr.encrypt(newNoteContent);

    await Note.updateOne({
        _id: noteId
    }, {
        $set: {
            noteTitle: encryptedNewNoteTitle,
            noteContent: encryptedNewNoteContent
        }
    })

    res.send({
        edit: true,
        msg: "Note Updated Successfully"
    })
}

const AddTask = async (req, res) => {

    if (new Date(req.body.deadTime) > new Date(Date.now())) {
        await Task.insertMany({
            Task: cryptr.encrypt(req.body.Task),
            DeadTime: req.body.deadTime,
            Done: false,
            user: req.body.userId,
            TaskCreated: new Date(Date.now())
        })

        res.send({
            msg: "Task Added Successfully",
            add: true
        })
    }
    else {
        res.send({
            msg: "Check Dead Time",
            add: false
        })
    }
}

const GetAllTask = async (req, res) => {
    const AllTask = await Task.find({
        user: req.query.id
    });
    AllTask.forEach(task => {
        task.Task = cryptr.decrypt(task.Task)
    })
    res.send(AllTask)
}

const DeleteTask = async (req, res) => {
    const { id } = req.query;
    await Task.deleteOne({
        _id: id
    })
    res.send({
        delete: true,
        msg: "Task Deleted Successfully"
    })
}

const editTask = async (req, res) => {
    const { id } = req.body;
    await Task.updateOne({
        _id: id
    }, {
        $set: {
            Done: true
        }
    })
    res.send("done")
}

const GetUserData = async (req, res) => {
    const { id } = req.query;

    const userData = await User.findOne({
        _id: id
    })

    res.send(userData);
}

const ChangePassword = async (req, res) => {
    const { id, password, confirm_password } = req.body;
    var hashedPassword = await bcrypt.hash(password, 12);

   if(password.length>7){
    if (password === confirm_password) {
        await User.updateOne({
            _id: id
        }, {
            $set: {
                password: hashedPassword
            }
        })
        res.send({
            change: true,
            msg: "password updated successfully"
        })
    }
    else {
        res.send({
            change: false,
            msg: "password and confirm password should be same"
        })
    }
   }
   else{
    res.send({
        change: false,
        msg: "password should contain atleast 8 character"
    })
   }
}

const VerifyPassword = async (req, res) => {
    const { id, password } = req.query;

    const user = await User.findOne({
        _id: id
    })
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            res.send({
                verified: true,
                msg:"Password is verified"
            })
        }
        else {
            res.send({
                verified: false,
                msg:"Incorrect Password"
            })
        }
    }
    else {
        res.send({
            verified: false,
            msg:"User Not Found"
        })
    }
}

module.exports = { LoginUser, RegisterUser, AddNote, GetAllNotes, DeleteNote, EditNote, AddTask, GetAllTask, DeleteTask, editTask, GetUserData, VerifyPassword, ChangePassword };