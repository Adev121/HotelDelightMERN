import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs } from "antd";
import axios from "axios";
import {
  FaHotel,
  FaCalendarCheck,
  FaCalendarTimes,
  FaDoorOpen,
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("newuser"));
  const userName = user.name;
  const userEmail = user.email;
  const userId = user.id;
  const [userBooking, setuserBooking] = useState([]);

  // const tempuser =  [];

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    } else {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            `https://hoteldelight-backend.onrender.com/getUserBookings`
          );
          // setuserBooking(response.data);
          console.log(response.data);

          const filterUser = response.data.filter(
            (booking) => booking.userid === userId
          );
          setuserBooking(filterUser);
          // tempuser.push(filterUser);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchBookings();
    }
  }, []);

  console.log(userBooking);

  return (
    <>
      <Navbar />
      <div className=" bg-gray-100 min-h-screen py-4">
        <div className=" flex flex-col items-start mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100  w-[1000px]">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Profile
                </span>
              }
              key="1"
            >
              <h1 className="text-2xl font-bold">UserName : {userName}</h1>
              <h1 className="text-2xl font-bold">User Id : {userId}</h1>
              <h1 className="text-2xl font-bold">User Email : {userEmail}</h1>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Bookings{`(${userBooking.length})`}
                </span>
        
              }
              key="2"
            >
              {userBooking.length > 0 ? (
                userBooking.map((item) => (
                  <BookingCard key={item._id} item={item} />
                ))
              ) : (
                <div className="text-center text-xl font-semibold">
                  No Bookings Found
                </div>
              )}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileScreen;

export function BookingCard({ item }) {
    const handleCancelBooking = async () => {
        const bookingid = item._id;
        try {
          const response = await axios.post(`https://hoteldelight-backend.onrender.com/cancelBooking`, { bookingid });    
          console.log(response.data);
          
          setTimeout(()=>{
            swal(`Booking Cancelled !`,'','success');
            window.location.reload();
          },2000) // reload to reflect cancelled status
        } catch (error) {
          console.log(error.response.data);
          swal(`${error.response.data.message}`,'','error');
        }
      };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-6 border border-gray-100 transition-transform hover:scale-105 duration-300 w-[800px] relative">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
        <FaHotel /> Booking Details
      </h2>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-gray-600 font-semibold">Hotel Name:</p>
          <p className="text-lg">{item.room}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Booking ID:</p>
          <p className="text-lg flex items-center gap-1">
            <FaDoorOpen /> {item._id}
          </p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Room ID:</p>
          <p className="text-lg flex items-center gap-1">
            <FaDoorOpen /> {item.roomid}
          </p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Check-in:</p>
          <p className="text-lg flex items-center gap-1 text-green-600">
            <FaCalendarCheck /> {item.checkin}
          </p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Check-out:</p>
          <p className="text-lg flex items-center gap-1 text-red-600">
            <FaCalendarTimes /> {item.checkout}
          </p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">Total Price:</p>
          <p className="text-xl font-bold text-orange-600 flex items-center gap-1">
            <FaRupeeSign /> {item.totalamount}
          </p>
        </div>
        {item.status === "Booked" && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            <FaCheckCircle className="text-green-500" />
            Booked
          </div>
        )}
        {item.status === "Cancelled" && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            <FaTimesCircle className="text-red-500" />
            Cancelled
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="btn text-xl font-bold bg-blue-200 text-black flex items-center gap-1 hover:bg-red-400 hover:text-white"
          id="cancelbooking"
          onClick={handleCancelBooking}
        > Cancel booking
        </button>
      </div>
    </div>
  );
}


// export function CancelBooking(bookingid) {
//     const [cancelBooking, setCancelBooking] = useState('');
//     useEffect(async ()=>{

//             try {
//                 const response = await axios.post(`https://hoteldelight-backend.onrender.com/cancelBooking`, { bookingid });
//                 console.log(response.data);
//                 setCancelBooking(response.data);
//                 console.log("Booking Cancelled !")
//             } catch (error) {
//                 console.log(error.message);
//             }
 
//     },[])
    
//     // fetchBookings()
//   return (
//     <div>
//       <h1>Cancelled Booiking Successfull</h1>
//     </div>
//   )
// }


