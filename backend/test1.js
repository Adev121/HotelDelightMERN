import data from './data.js'
import moment from 'moment'

const tempRooms =  [];
const availableroom = [];

for(const i of data){
    for( const j of i.currentbookings){
        if(i.currentbookings.length>0){
            tempRooms.push(j)
        }
    }
}

function  checkAvailability(availableDt){
    const date=moment(availableDt,'DD-MM-YYYY');
    for(const room of tempRooms){
        if(date.isBetween(moment(room.checkin,'DD-MM-YYYY'), moment(room.checkout,'DD-MM-YYYY'))===false)
        {
            if(availableroom.includes(room.roomid)===false)
            availableroom.push(room)
        }
    }
    return availableroom
}

const response =async ()=>{
    await fetch('https://hoteldelight-backend.onrender.com/getRooms')
    .then((res) => res.json())
    .then((data) => console.log(data));    
    
} 

response()


// console.log(checkAvailability('20-05-2025'))

// console.log(tempRooms)