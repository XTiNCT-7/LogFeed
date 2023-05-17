import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
const LogItem=({data,index})=> {
    let backgroundColor='';
    if(data.level=="INFORMATION"){
        backgroundColor="#7dcb7d";
    }else if(data.level=="WARNING"){
        backgroundColor="orange";
    }else if(data.level=="TRACE"){
        backgroundColor="blue";
    }
  return (
    <>
        <Accordion.Item eventKey={index}>
                <Accordion.Header>
                    <table className="log-table">  
                        <tr>
                            <td>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                {/* <label for="vehicle1"> Error</label> */}
                            </td>
                            <td>{data.date}</td>
                            <td>{data.time}</td>
                            <td ><div style={{backgroundColor}}>{data.level}</div></td>
                            <td>{data.message}</td>
                        </tr> 
                    </table>
                    {/* {data.message} */}
                </Accordion.Header>
                <Accordion.Body>
                    Additional information
                </Accordion.Body>
        </Accordion.Item>
    </>
  )
}

export default LogItem