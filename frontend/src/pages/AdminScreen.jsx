import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import swal from "sweetalert";
function AdminScreen() {
  const [getbooking, setgetBookings] = useState([]);
  const [getRooms, setgetRooms] = useState([]);
  const [getallusers, setallusers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("newuser"));

    // 👇 Only allow if username is exactly 'admin'
    if (!user || user.name !== "admin") {
      alert("Access denied! Only admin can access this page.");
      navigate("/"); // redirect to home or login page
      return;
    } else {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            `https://hoteldelight-backend.onrender.com/getUserBookings`
          );
          setgetBookings(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      const getRooms = async (req, res) => {
        try {
          const res = await axios.get(`https://hoteldelight-backend.onrender.com/getRooms`);
          setgetRooms(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error.message);
        }
      };

      const getAllUsers = async (req, res) => {
        try {
          const res = await axios.get(`https://hoteldelight-backend.onrender.com/getUsers`);
          setallusers(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchBookings();
      getRooms();
      getAllUsers();
    }
  }, []);
  console.log(getbooking);
  return (
    <>
      <Navbar />
      <div className="text-center font-extrabold text-2xl py-4 ml-10 mr-10">
        <h1>Admin Panel</h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <span style={{ fontSize: "20px" }}>
                Bookings{` (${getbooking.length})`}
              </span>
            }
            key="1"
          >
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Booking Id
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      User Id
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Room Id
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Check In
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Check Out
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Booked_Dt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getbooking.map((booking) => (
                    <tr key={booking._id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.userid}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.roomid}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.checkin}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.checkout}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        style={{
                          color:
                            booking.status === "Cancelled"
                              ? "red"
                              : booking.status === "Booked"
                              ? "green"
                              : "",
                        }}
                      >
                        {booking.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {moment(booking.booked_dt).format("DD-MM-YYYY HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Rooms
              </span>
            }
            key="2"
          >
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Rooms Id
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Room Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Room Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Rent Per Day
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Max Count
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Phonenumber
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Current Bookings
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Room_Added_Dt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getRooms.map((rooms) => (
                    <tr key={rooms._id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.type}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.rentperday}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.maxcount}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.phonenumber}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {rooms.currentbookings.length}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {moment(rooms.createdAt).format("DD-MM-YYYY HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Add Rooms
              </span>
            }
            key="3"
          >
            <Addroom />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Users
              </span>
            }
            key="4"
          >
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      User Id
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      User Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      User Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      IsAdmin
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      User_Regt_Dt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getallusers.map((user) => (
                    <tr key={user._id}>
                      {console.log(user.isadmin)}
                      <td className="border border-gray-300 px-4 py-2">
                        {user._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.isadmin}
                      </td>
                      {/* <td className="border border-gray-300 px-4 py-2">{user.isadmin === undefined ? "Nope" : user.isadmin ? user.isadmin : "No"}</td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {moment(user.createdAt).format("DD-MM-YYYY HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default AdminScreen;

import "./addroom.css";
export function Addroom() {
    const [roomname, setRoomName] = useState('');
    const [imageUrls1, setImageUrls1] = useState('');
    const [imageUrls2, setImageUrls2] = useState('');
    const [imageUrls3, setImageUrls3] = useState('');
    const [type,setType] = useState("Delux");
    const [rentperday,setrentperday] = useState('');
    const [maxcount,setMaxcount] = useState('');
    const [phone,setPhone] = useState('');
    const [description,setDescription] = useState('');

const handleAddRoom = async ()=>{
    const data = {
        name: roomname,
        imageurls: [imageUrls1, imageUrls2, imageUrls3],
        rentperday: rentperday,
        type: type,
        maxcount: maxcount,
        phonenumber: phone,
        description: description,
    };
    console.log(data);
    try {
        const res = await axios.post("https://hoteldelight-backend.onrender.com/addrooms", data);
    if (res.status === 200) {
        swal("Room added successfully",'','success');
    } else {
        swal("Oops Something went wrong",`${error.response.data.message}`,'error');
    }
    } catch (error) {
        console.log(error.response.data.message);
        swal("Oops Something went wrong",`${error.response.data.message}`,'error');
    }
    
}

return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleAddRoom();
    }}
  >
    <h2 className="text-2xl font-semibold mb-6 text-center">Add New Room</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setRoomName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Rent per day */}
      <div>
        <label htmlFor="rentperday" className="block text-sm font-medium text-gray-700">Rent per day</label>
        <input
          type="number"
          id="rentperday"
          name="rentperday"
          required
          onChange={(e) => setrentperday(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Delux">Delux</option>
          <option value="Non-Delux">Non-Delux</option>
        </select>
      </div>

      {/* Max Count */}
      <div>
        <label htmlFor="maxcount" className="block text-sm font-medium text-gray-700">Max Count</label>
        <input
          type="number"
          id="maxcount"
          name="maxcount"
          required
          onChange={(e) => setMaxcount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          required
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image URLs */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Image URLs</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
          <input
            type="text"
            placeholder="Image URL 1"
            required
            onChange={(e) => setImageUrls1(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Image URL 2"
            onChange={(e) => setImageUrls2(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Image URL 3"
            onChange={(e) => setImageUrls3(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          required
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="mt-6 text-center">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all"
      >
        Add Room
      </button>
    </div>
  </form>
</div>

);
}
