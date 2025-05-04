import Rooms from '../models/room.model.js'
export const getRooms = async(req,res)=>{
    try {
        const fetchRooms = await Rooms.find()
        res.status(200).json(fetchRooms);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const addRooms = async(req,res)=>{
    
    try {
        const {name, rentperday, maxcount,phonenumber, type, imageurls, description} = req.body;
        const dupRoom = await Rooms.find({name})
        if(dupRoom.length > 0){
            return res.status(400).json({message:"Room already exists"})
        }
        else{
            const newRoom = new Rooms({
                name,
                rentperday,
                maxcount,
                phonenumber,
                type,
                imageurls,
                description
            })
            // console.log(newRoom)
            await newRoom.save()
            return res.status(200).json({message:"Room added successfully"})
        }
            
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}
