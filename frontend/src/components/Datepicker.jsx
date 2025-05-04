import React, { useState } from 'react'
import { DatePicker } from "antd";
import moment from 'moment'
function Datepicker() {
    const { RangePicker } = DatePicker;
    const [checkin,setCheckin]=useState(null)
    const [checkout,setCheckout]=useState(null)
    const handleDate=(dates)=>{
            if(dates){
                console.log(dates)
                const checkIn = dates[0].format('MMMM Do YYYY')
                const checkOut = dates[1].format('MMMM Do YYYY')
                setCheckin(checkIn)
                setCheckout(checkOut)
                console.log(checkIn,checkOut)
            }
    }   

  return (
    <div className='flex justify-center m-4 '>
      <RangePicker onChange={handleDate} placeholder={["Check-in", "Check-out"]} size="large" style={{ height: "40px", fontSize: "16px", width: "700px",fontWeight:'bold' , color:"blue", border:'1px solid grey'}}/>
    </div>
  )
}

export default Datepicker
