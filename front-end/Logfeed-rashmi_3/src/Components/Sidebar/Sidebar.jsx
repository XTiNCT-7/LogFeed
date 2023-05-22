import React from 'react'
import { FaFilter } from 'react-icons/fa'
import './sidebar.css'

const systems = ["MUTS-72636-WL", "System2", "System3"]

export default function Sidebar({onFilter}) {

    const handleDate = (e)=>{
        console.log(e.target.value)
    }

    const handleTime = (e)=>{
        console.log(e.target.value)
        onFilter(e.target.value);
    }

    const handleLogType = (e)=>{
        console.log(e.target.value)
    }

    const handleSystem = (e)=>{
        console.log(e.target.value)
        onFilter(e.target.value)
    }


    return (
        <section className='bg-header p-4 text-white rounded'>
            <div className='fs-4 fw-bold'><FaFilter /> Filters</div>
            <div className='row mt-4'>
                <div className='col-4'>Date:</div>
                <div className='col-8'>
                    <div className='rounded overflow-hidden'>
                        <input type="date" className="form-control " id="datevalue" onChange={handleDate}/>
                    </div>
                </div>
            </div>
            <hr className='text-light' />
            <div className='row mt-4'>
                <div className='col-4'>Time:</div>
                <div className='col-8'>
                    <div className="dropdown">
                        <select className="form-select form-select-sm" defaultValue="0" aria-label="select time" onChange={handleTime} >
                            <option value="0" selected>Choose time</option>
                            {/* <option value="0.25">Last 15 minutes</option>
                            <option value="0.5">Last 30 minutes</option> */}
                            <option value="1">Last 1 hour</option>
                            <option value="2">Last 2 hours</option>
                            <option value="4">Last 4 hours</option>
                            <option value="6">Last 6 hours</option>
                            <option value="12">Last 12 hours</option>
                            <option value="24">Last 24 hours</option>
                        </select>
                    </div>
                </div>
            </div>
            <hr className='text-light' />
            <div className='row mt-4'>
                <div className='col-4'>Log Type:</div>
                <div className='col-8'>
                    <div className="dropdown">
                        <select className="form-select form-select-sm" defaultValue="none" aria-label="select log type" onChange={handleLogType}>
                            <option value="none" selected>Choose log</option>
                            <option value="information">Information</option>
                            <option value="warning">Warning</option>
                            <option value="trace">Trace</option>
                        </select>
                    </div>
                </div>
            </div>
            <hr className='text-light' />
            <div className='row mt-4'>
                <div className='col-4'>System:</div>
                <div className='col-8'>
                    <div className="dropdown">
                        <select className="form-select form-select-sm" defaultValue="none" aria-label="select system" onChange={handleSystem}>
                            <option value="none" selected>Choose system</option>
                            {
                                systems.map((value,index)=>{
                                    return(
                                        <option value={value} key={index}>{value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </section>

    )
}
