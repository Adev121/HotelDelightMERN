import React, { useState } from "react";
import { DatePicker } from "antd";
import { FaSearch } from "react-icons/fa";
import moment from "moment";


function NewDatePicker() {
  const [dates, setDates] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [destination, setDestination] = useState("");
  

  const handleDateChange = (value) => {
    setDates(value);
  };

  const incrementRooms = () => {
    setRooms((prev) => prev + 1);
  };

  const decrementRooms = () => {
    if (rooms > 1) {
      const newRooms = rooms - 1;
      setRooms(newRooms);
      if (guests > newRooms * 3) {
        setGuests(newRooms * 3);
      }
    }
  };

  const incrementGuests = () => {
    if (guests < rooms * 3) {
      setGuests((prev) => prev + 1);
    }
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests((prev) => prev - 1);
    }
  };


  const handleSearch = () => {
    
    const searchData = {
      destination: destination,
      checkIn: dates[0] ? dates[0].format("DD-MM-YYYY") : null,
      checkOut: dates[1] ? dates[1].format("DD-MM-YYYY") : null,
    };

    console.log("Search Data:", JSON.stringify(searchData, null, 2));
  };

  const { RangePicker } = DatePicker;

  return (
    <div>
      <div className="flex justify-center py-6">
        <div className="bg-white border border-slate-200 shadow-md rounded-full flex items-center px-4 py-3 gap-4 relative">
          <div className="text-left px-4 border-r">
            <p className="text-xs text-gray-500">Destination</p>
            <input
              type="text"
              className="font-semibold ouline-none text-xl"
              onChange={(e) => setDestination(e.target.value)}
              onFocus={(e) => (e.target.style.outline = "none")}
              value={destination}
              placeholder="Enter your destination"
            />
          </div>

          <div className="text-left px-4 border-r flex flex-col justify-center items-center">
            <RangePicker
              onChange={handleDateChange}
              className="absolute opacity-0 w-24 h-10 border-1 border-red-500"
              format="DD-MM-YYYY"
            />
            <p className="text-xs text-gray-500">Check-in</p>
            <p className="font-bold text-lg w-44 text-center">
              {dates?.[0] ? dates[0].format("ddd, DD MMM") : "Select"}
            </p>
          </div>

          <div className="text-left px-4 border-r flex flex-col justify-center items-center">
            <p className="text-xs text-gray-500">Check-out</p>
            <p className="font-bold text-lg w-44 text-center">
              {dates?.[1] ? dates[1].format("ddd, DD MMM") : "Select"}
            </p>
          </div>

          <div
            className="text-left px-4 border-r cursor-pointer relative"
            onClick={() => setShowGuestSelector(showGuestSelector===false)}
          >
            <p className="text-xs text-gray-500">Rooms & Guests</p>
            <p className="font-semibold text-sm">{rooms} Room, {guests} Guests</p>

            {showGuestSelector && (
              <div className="absolute bg-white border rounded-lg p-4 w-64 top-[70px] z-20 right-0 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Rooms</span>
                  <div className="flex gap-2 items-center">
                    <button onClick={decrementRooms} className="bg-blue-300 w-8 h-8 rounded text-white text-lg">−</button>
                    <span className="w-6 text-center">{rooms}</span>
                    <button onClick={incrementRooms} className="bg-blue-300 w-8 h-8 rounded text-white text-lg">+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Guests</span>
                  <div className="flex gap-2 items-center">
                    <button onClick={decrementGuests} className="bg-blue-300 w-8 h-8 rounded text-white text-lg">−</button>
                    <span className="w-6 text-center">{guests}</span>
                    <button
                      onClick={incrementGuests}
                      className="bg-blue-300 w-8 h-8 rounded text-white text-lg"
                      disabled={guests >= rooms * 3}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Max 3 guests per room</p>
              </div>
            )}
          </div>

          <div className="px-4">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full flex items-center gap-2" onClick={handleSearch}>
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDatePicker;
