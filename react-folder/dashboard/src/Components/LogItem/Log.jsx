import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BiSearch} from 'react-icons/bi';
import LogItem from './LogItem';
import './LogItem.css';
const Log=()=> {
    const data=[
            "03/22 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP",
            "03/23 08:51:06 INFO   :....mailbox_register: mailbox allocated for ",
            "03/24 08:51:06 INFO   :.....mailslot_create: creating mailslot for RSVP via UDP",
            "03/24 08:51:06 WARNING :.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.",
            "03/24 08:51:06 INFO   :....mailbox_register: mailbox allocated for rsvp-udp",
            "04/24 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized"
        ]
    
    const jsonData = [];

    data.forEach((logEntry) => {
    const logObject = {};
    const logComponents = logEntry.split(" ");
    logObject.date = logComponents[0];
    logObject.time = logComponents[1];
    logObject.level = logComponents[2];
    logObject.message = logComponents.slice(4).join(" ");
    
    jsonData.push(logObject);
    });
    console.log(jsonData);
  return (
    <div>
        <div>
            <InputGroup className="mb-3 search">
                <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2"><BiSearch/></InputGroup.Text>
            </InputGroup>
        </div>
        <div className="table-title">
            <span>Select</span>
            <span>Date</span>  
            <span>Time</span>  
            <span>Level</span>    
        </div>
        <Accordion defaultActiveKey="0">
            {jsonData.map((i,index)=>{
                console.log(index)
                return(
                    <table>
                        {/* <tr> */}
                            {/* <td> */}
                           
                                <LogItem data={i} index={index}/>
                            {/* </td> */}
                        {/* </tr> */}
                    </table>
                    
                )
            })}
           {/* <LogItem/> */}
            
        </Accordion>
    </div>
  )
}

export default Log