import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { BiCaretDown, BiCartDownload } from 'react-icons/bi';
const LogItem = ({ data, index }) => {
    console.log(index)
    return (
        <>
        <tr style={{backgroundColor: "#F0F8FF"}}>
            <td>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            </td>
            <td>{data.date}</td>
            <td>{data.time}</td>
            <td>{data.level}</td>
            <td>
                <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target={"#ac"+index} aria-expanded="false" aria-controls="accordionContent">
                    <BiCaretDown />
                </button>
            </td>
        </tr>
        <tr>
            <td colSpan={5}>
            <div class="collapse" id={"ac"+index}>
                    <div class="card card-body">
                        <p>{data.message}</p>
                    </div>
                </div>
                </td>
        </tr>
        </>
    )
}

export default LogItem