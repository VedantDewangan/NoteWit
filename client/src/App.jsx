import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login"
import { Note } from "./Pages/Note"
import { Signup } from "./Pages/Signup"
import { Task } from "./Pages/Task"

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/note' element={<Note />} />
                    <Route path='/task' element={<Task />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
