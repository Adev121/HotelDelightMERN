import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import "../components/loader.css";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(
  "pk_test_51RKZ1VR3MkzWkbTGJjzCnvHMpTHjqmK5dJELPn2PqkXf8htujx4eZ0U9b48HNoUcAUJc4pjpU212fLBX85GOZzso00240pIt3b"
);
function BookingScreen() {
  const [loading, setloading] = useState(true);
  const { _id, cin, cout } = useParams();
  const location = useLocation();
  //Passing the state parameter of room
  const room = location.state?.room;
  console.log(room);

  const checkinDate = moment(cin, "DD-MM-YYYY");
  const checkoutDate = moment(cout, "DD-MM-YYYY");
  const totalDays = checkoutDate.diff(checkinDate, "days");
  const totalAmount = room.rentperday * checkoutDate.diff(checkinDate, "days");
  setTimeout(() => {
    setloading(false);
  }, 3000);

  const currentUser = JSON.parse(localStorage.getItem("newuser")).name;

  const bookingDetails = {
    room: room.name,
    roomid: room._id,
    userid: JSON.parse(localStorage.getItem("newuser")).id,
    username: currentUser,
    checkin: cin,
    checkout: cout,
    totalamount: totalAmount,
    totaldays: totalDays,
  };
  console.log(bookingDetails);

  //Payment token
  // const onToken = (token) => {
  //   console.log(token);
  // };

  const handleBooking = async () => {
    await axios
      .post("http://localhost:5000/bookings", bookingDetails)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setTimeout(() => {
            // swal("Room Booked Successfully !", "", "success");
            window.location.href = "/success";
            toast.success("Room Booked Successfully !");
          }, 1000);

          console.log("Room Booked Successfully ");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.message}`);
      });
  };
  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 md:flex md:gap-6 ">
              {/* Image Section */}
              <div className="md:w-1/2">
                <h2 className="text-lg font-semibold mb-2">{room.name}</h2>
                <img
                  src={room.imageurls[0]}
                  alt="Hotel Room"
                  className="rounded-md w-full h-[400px] object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="md:w-1/2 mt-6 md:mt-0">
                <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">
                    Booking Details
                  </h3>
                  <p>
                    <strong>RoomId : </strong>
                    {room._id}
                  </p>
                  <p>
                    <strong>Name : </strong>
                    {currentUser}
                  </p>
                  <p>
                    <strong>Checkin Date :</strong> {cin}
                  </p>
                  <p>
                    <strong>Checkout Date :</strong> {cout}
                  </p>
                  <p>
                    <strong>Max Count :</strong> {room.maxcount}
                  </p>

                  <h3 className="text-xl font-bold mt-6 mb-4 border-b pb-2">
                    Amount
                  </h3>
                  <p>
                    <strong>Total Days :</strong>
                    {totalDays}
                  </p>
                  <p>
                    <strong>Rent Per Day :</strong> {room.rentperday}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    <strong>Total Amount :</strong> ₹ {totalAmount} /-
                  </p>

                  {/* <button
                    className="mt-4 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
                    onClick={() => {
                      handleBooking();
                    }}
                  >
                    onClick={handleBooking}
                    Pay Now
                  </button> */}
                  <CheckoutForm netamount={totalAmount} handleBooking={handleBooking}/>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default BookingScreen;
