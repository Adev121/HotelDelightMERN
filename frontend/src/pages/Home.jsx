import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ListRooms from "../components/ListRooms";
import Footer from "../components/Footer";
import { DatePicker } from "antd";
import axios from "axios";
import CarousalMenu from "../components/CarousalMenu";
import NewDatePicker from "../components/NewDatePicker";

function Home() {
  const { RangePicker } = DatePicker;
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [roomType, setRoomType] = useState("All");
  const [searchrooms, setSearchrooms] = useState("");

  const handleDate = (dates) => {
    if (dates) {
      console.log(dates);
      const checkIn = dates[0].format("DD-MM-YYYY");
      const checkOut = dates[1].format("DD-MM-YYYY");
      setCheckin(checkIn);
      setCheckout(checkOut);
      console.log(checkIn);
      console.log(checkOut);
    }
  };

  console.log(checkin);
  console.log(checkout);

  console.log(searchrooms);
  return (
    <div>
      <Navbar />

      <div className="flex justify-center m-4 ">
        <RangePicker
          onChange={handleDate}
          placeholder={["Check-in", "Check-out"]}
          size="large"
          style={{
            height: "40px",
            fontSize: "16px",
            width: "700px",
            fontWeight: "bold",
            color: "blue",
            border: "1px solid grey",
          }}
        />
        <div>
          <input
            type="text"
            name="searchrooms"
            id="searchrooms"
            placeholder="Search Rooms"
            className="border-2 border-gray-300 rounded-md ml-4 px-4 py-2"
            onChange={(e) => setSearchrooms(e.target.value)}
          />
        </div>
        <div className="border-2 border-gray-300 rounded-md ml-4 px-4 py-2">
          <select
            selected="All"
            onChange={(e) => {
              setRoomType(e.target.value);
            }}
          >
            <option value="All">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <NewDatePicker />
      <CarousalMenu />
      <ListRooms
        checkIN={checkin}
        checkOUT={checkout}
        roomType={roomType}
        searchrooms={searchrooms}
      />
      <Footer />
    </div>
  );
}

export default Home;
