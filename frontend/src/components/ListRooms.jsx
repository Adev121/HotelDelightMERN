import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import Card from './Card';

function ListRooms({ checkIN, checkOUT, roomType, searchrooms }) {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [newRooms, setNewRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://hoteldelight-backend.onrender.com/getRooms');
        const allRooms = res.data;
        const availablerooms = [];

        const selectedCheckIn = moment(checkIN, 'DD-MM-YYYY');
        const selectedCheckOut = moment(checkOUT, 'DD-MM-YYYY');

        for (const room of allRooms) {
          let isAvailable = true;

          for (const booking of room.currentbookings) {
            const bookingCheckIn = moment(booking.checkin, 'DD-MM-YYYY');
            const bookingCheckOut = moment(booking.checkout, 'DD-MM-YYYY');

            const overlaps =
              selectedCheckIn.isBetween(bookingCheckIn, bookingCheckOut, null, '[]') ||
              selectedCheckOut.isBetween(bookingCheckIn, bookingCheckOut, null, '[]') ||
              bookingCheckIn.isBetween(selectedCheckIn, selectedCheckOut, null, '[]') ||
              bookingCheckOut.isBetween(selectedCheckIn, selectedCheckOut, null, '[]');

            if (overlaps) {
              isAvailable = false;
              break;
            }
          }

          if (isAvailable) {
            availablerooms.push(room);
          }
        }

        setFilteredRooms(availablerooms);
      } catch (err) {
        console.log(err.message);
      }
    };

    if (checkIN && checkOUT) {
      fetchData();
    }
  }, [checkIN, checkOUT]);

  useEffect(() => {
    let updatedRooms = filteredRooms;

    if (roomType !== 'All') {
      updatedRooms = updatedRooms.filter(
        room => room.type.toLowerCase() === roomType.toLowerCase()
      );
    }

    if (searchrooms.trim() !== '') {
      updatedRooms = updatedRooms.filter(
        room => room.name.toLowerCase().includes(searchrooms.toLowerCase())
      );
    }

    setNewRooms(updatedRooms);
  }, [filteredRooms, roomType, searchrooms]);

  return (
    <div className='grid grid-cols-2'>
      {newRooms.map((item) => (
        <Card key={item._id} item={item} cin={checkIN} cout={checkOUT} />
      ))}
    </div>
  );
}

export default ListRooms;
