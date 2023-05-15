import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
const LogItem=({data,index})=> {
    console.log(index)
  return (
    <article>
        <Accordion.Item eventKey={index}>
                <Accordion.Header>
                    <table> 
                        <tr>
                            <td>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                {/* <label for="vehicle1"> Error</label> */}
                            </td>
                            <td>{data.date}</td>
                            <td>{data.time}</td>
                            <td>{data.level}</td>
                        </tr>
                    </table>
                    {/* {data.message} */}
                </Accordion.Header>
                <Accordion.Body>
                    {data.message}
                </Accordion.Body>
        </Accordion.Item>
    </article>
  )
}

export default LogItem