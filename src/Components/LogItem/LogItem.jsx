import React from 'react'
import { BiCaretDown} from 'react-icons/bi';
const LogItem = ({ data, index }) => {
    console.log(index)

    let backgroundColor='';
    if(data.level==="INFORMATION"){
        backgroundColor="#7dcb7d";
    }else if(data.level==="WARNING"){
        backgroundColor="orange";
    }else if(data.level==="TRACE"){
        backgroundColor="blue";
    }

    return (
        <>
        <tr style={{backgroundColor: "#F0F8FF"}} >
            <td className='ps-4 col-1'>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            </td>
            <td className='col-2'>{data.date}</td>
            <td className='col-2'>{data.time}</td>
            <td className='col-2 text-center'>
                <p style={{backgroundColor: backgroundColor, borderRadius: "1rem"}} className='fs-6 p-1 text-white'>{data.level}</p>
            </td>
            <td className='col-5'>
                <div className='row'>
                    <div className='col-8'>
                    <span className='fs-6'>{data.message.substring(0,40) + "... "}</span>
                    </div>
                    <div className='col-4'>
                    <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target={"#ac"+index} aria-expanded="false" aria-controls="accordionContent">
                    <span className='text-primary'>view all<BiCaretDown /></span> </button>
                    </div>
                </div>        
            </td>
        </tr>
        <tr>
            <td colSpan={5}>
            <div class="collapse" id={"ac"+index}>
                    <div class="card card-body">
                        <p><span className='fw-bold fs-6'>Log: </span>{data.message}</p>
                    </div>
                </div>
                </td>
        </tr>
        </>
    )
}

export default LogItem