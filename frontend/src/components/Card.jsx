import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Card({ item,cin,cout }) {
    const modalId= `modal_id_${item._id || item.name}`
    const handleClose=()=>{
        document.getElementById(modalId).close()
    }
    const navigate =useNavigate()
  
  console.log(item);
  console.log(cin);
  console.log(cout);
  return (
    <>
      <div className="flex bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl mx-auto my-4">
        {/* Left: Image */}
        <div className="w-1/3">
          <img
            src={item.imageurls[0]}
            alt="Room"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right: Details */}
        <div className="w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {item.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Phone:</strong> {item.phonenumber}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Room Type:</strong> {item.type}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Max People:</strong> {item.maxcount}
            </p>
            <p className="text-gray-600 mb-1 text-xl">
              <strong className="text-red-600">Rent/Day :</strong> Rs. {item.rentperday}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => document.getElementById(modalId).showModal()}>
              View Details
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={()=> {
              const user= localStorage.getItem('newuser')
              if(!user){
               swal("Please login to book a room",'','error')
                navigate('/login')
              }else
              navigate(`/booking/${item._id}/${cin}/${cout}`,{ state: { room: item} })
            }}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={modalId} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <button className="btn hover:bg-red-400 hover:text-white" onClick={()=>{handleClose()}} ><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
          
          
          <div className="modal-action">
            <div method="dialog">
              {/* if there is a button, it will close the modal */}
              <div className="grid grid-cols-2 justify-center">
                {
                    item.imageurls.map((url,index)=>(
                       <img key={index} src={url} className="p-2"/>
                    ))
                }
            </div>
            <div>
                <p>{item.description}</p>
            </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Card;
