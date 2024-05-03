
# NoteWit


NoteWit is a user-friendly web application designed to help you stay organized and on top of your tasks and notes. With NoteWit, you can easily create an account, log in securely, and start managing your notes and tasks effortlessly.



## Features

- **Account Creation and Authentication**: Create an account with a unique email address and password. Authentication ensures the security of your account.
- **Note Management**:
  - Create, edit, and delete notes.
  - Search notes.
  - Sort notes (latest first and oldest first).
  - Note details are encrypted for security.
- **Task Management**:
  - Add tasks with a deadline.
  - Delete tasks.
  - Mark tasks as read.
  - Sort tasks.
  - Task details are encrypted for security.
- **Password Encryption**: Passwords are encrypted to enhance security.


## Tech Stack

**Client:** React, Chakara UI

**Server:** Node, Express

**Database:** MongoDB

## Getting Started

To run this project on your local machine, follow these steps:
1. Clone this repository:

```bash
git clone https://github.com/VedantDewangan/NoteWit
```

2. For Frontend 
```bash
  cd client
```

2a. Install npm packages
```bash
npm i 
```
2b. Start the frontend
```bash
npm run dev
```
Open your browser and visit http://localhost:5173 to view the Frontend Application.


3.For Backend
```bash
cd ../server
```
3a. Install npm packages
```bash
npm i
```

3b. Create a ```.env``` file in the root directory of your project (server) and add the following line

```bash 
PORT=YOUR_PORT
```

```bash
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
```

```bash
CRYPTR_SECRET_KEY=MAKE_SECRET_CRYPTR_KEY
```

3b. Start the backend
```bash 
node server.js
```

Make sure you get the message in terminal 

```
Connection with DATABASE Successfull

Server is working at post YOUR_PORT
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo

You can visit This website on give link (This is not responsive so try to open in laptop)

https://notewit.netlify.app


## Screenshots

#### 1. SignUp Page

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-05-57.png)

#### 2. Home Page

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-06-26.png)

#### 3. Note Page

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-06-45.png)

#### 4.  Add Note

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-07-12.png)

#### 5. Task Page

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-06-56.png)

#### 6. Add Task

![App Scrnshot](https://github.com/VedantDewangan/NoteWit/blob/main/screenshots/Screenshot%20from%202024-05-03%2019-07-05.png)
## FAQ

#### This is responsive website

No it's Not

#### Our Notes and Task are encrypted

Yes, Admin can not see your personal data in database
