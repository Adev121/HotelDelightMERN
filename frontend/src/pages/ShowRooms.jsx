import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ShowRooms() {
  const [rooms, setRooms] = useState([]);
  const [type, setType] = useState("All");
  const [newrooms, setNewRooms] = useState([]);

  useEffect(() => {
    const fetchrooms = async () => {
      try {
        const res = await axios.get("https://hoteldelight-backend.onrender.com/getRooms");
        setRooms(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchrooms();
  }, []);

  console.log(type);



  const filterRooms = (selectedType) => {
    if (selectedType === 'All') {
      setNewRooms(rooms);
    } else {
      const filteredrooms = rooms.filter((room) => room.type === selectedType);
      setNewRooms(filteredrooms); // ✅ this is enough
    }
  };
  
  console.log(newrooms);

  return (
    <div>
      <Navbar />
      <h1>Show rooms</h1>
      <div className="border border-slate-500 w-28 ">
        <select
          name="type"
          className="outline-none"
          onChange={(e) => {
            const selected = e.target.value;
            setType(selected);
            filterRooms(selected);
          }}
        >
          <option value="All">All</option>
          <option value="Delux">Delux</option>
          <option value="Non-Delux">Non-Delux</option>
        </select>
      </div>
      {newrooms.map((room) => (
        <div key={room._id} className="border border-slate-200 my-4">
          <h2 className="text-xl font-bold">{room.name}</h2>
          <h2 className="text-sm font-bold">{room.type}</h2>
          <img src={room.imageurls[0]} className="w-32 h-32" alt={room.name} />
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default ShowRooms;






