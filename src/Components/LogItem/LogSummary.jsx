import React from 'react'
import { FaClock } from 'react-icons/fa';
import {BiBarChart} from 'react-icons/bi';

export default function LogSummary({length,time}) {
  return (
    <div className='row bg-white border rounded p-4 m-1'>
    <div className='col-6 text-center'>
        <div className='row'>
            <div className='col'>
            <BiBarChart className='display-5 block' />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
              {length} Logs
            </div>
        </div>
        
       
    </div>
    <div className='col-6 text-center'>
    <div className='row'>
            <div className='col'>
            <FaClock className='display-5 block' />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
              Last log recevied at {time}
            </div>
        </div>
    </div>
</div>
  )
}
