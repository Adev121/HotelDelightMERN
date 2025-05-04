import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ListRooms from "./components/ListRooms";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import toast, { Toaster } from 'react-hot-toast';
import BookingScreen from "./pages/BookingScreen";
import SuccessScreen from "./components/SuccessScreen";
import ShowRooms from "./pages/ShowRooms";
import ProfileScreen from "./pages/ProfileScreen";
import AdminScreen from "./pages/AdminScreen";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/contacts" element={<Contacts/>}></Route>
        <Route path="/aboutus" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/booking/:_id/:cin/:cout" element={<BookingScreen/>}></Route>
        <Route path="/success" element={<SuccessScreen/>}></Route>
        <Route path="/showrooms" element={<ShowRooms/>}></Route> {/*--Remove later*/}
        <Route path="/profile" element={<ProfileScreen/>}></Route>
        <Route path="/admin" element={<AdminScreen/>}></Route>
      </Routes>
    </BrowserRouter>
    <Toaster />
    </>
  );
}

export default App;
