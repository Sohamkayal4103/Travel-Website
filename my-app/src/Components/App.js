import React from "react"
import Header from "./Header"
import MainPage from "./MainPage";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App(){
    return(
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path ="/register" element={<RegistrationForm/>} />
            </Routes>
        </Router>
    )
}
export default App;