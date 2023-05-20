import React from 'react'
import { BiCaretDown, BiXCircle } from 'react-icons/bi';
const LogItem = ({ data, index, deleteLog }) => {
    let backgroundColor = '';
    if (data.level === "INFORMATION") {
        backgroundColor = "bg-success";
    } else if (data.level === "WARNING") {
        backgroundColor = "bg-warning";
    } else if (data.level === "TRACE") {
        backgroundColor = "bg-info";
    }

    return (
        <>
            <tr style={{ backgroundColor: "#F0F8FF" }} className='text-start' >
                <td className='col-2 ps-3'> <input type="checkbox" id="log" /> <span className='ps-3'>{data.date}</span></td>
                <td className='col-2'>{data.time}</td>
                <td className='col-2 text-center'>
                    <span style={{ borderRadius: "1rem" }} className={'fs-6 fw-bold d-block p-1 text-white ' + backgroundColor}><span style={{ fontSize: "0.75rem" }}>{data.level}</span>
                    </span>
                </td>
                <td className='col-5'>
                    <div className='row'>
                        <div className='col-7'>
                            <span className='fs-6'>{data.message.substring(0, 40) + "... "}</span>
                        </div>
                        <div className='col-3'>
                            <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target={"#ac" + index} aria-expanded="false" aria-controls="accordionContent">
                                <span className='text-primary'>view<BiCaretDown /></span> </button>
                        </div>
                        <div className='col-2'>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={"#modal"+index}>
                            <span className='text-danger fs-5'><BiXCircle /></span> 
                            </button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id={"modal"+index} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered model-sm">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title fw-bold" id={"modal"+index+"label"}>Delete log</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Are sure, you want to delete log ?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={() => deleteLog(index)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <button className="btn" type="button" onClick={() => deleteLog(index)} value={index}>
                                <span className='text-danger fs-5'><BiXCircle /></span> </button> */}
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <div className="collapse" id={"ac" + index}>
                        <div className="card card-body text-start">
                            <p><span className='fw-bold fs-6'>Log: </span>{data.message}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default LogItem