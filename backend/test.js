import fs from 'fs'
import moment  from 'moment';
const readData = fs.readFileSync('../backend/export2.json');
const data = JSON.parse(readData);


const temproom = [];
const availableroom = [];

for(const i of data){
    temproom.push({name:i.room,checkin:i.checkin,checkout:i.checkout})
}


function  checkAvailability(availableDt){
    const date=moment(availableDt,'DD-MM-YYYY');
    for(const room of temproom){
        if(date.isBetween(moment(room.checkin,'DD-MM-YYYY'),moment(room.checkout,'DD-MM-YYYY'))===false)
        {
            availableroom.push(room)
        }
    }
    return availableroom
}

console.log(checkAvailability('01-05-2025'))

