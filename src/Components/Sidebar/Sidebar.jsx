import React from 'react'
import {FaFilter} from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './sidebar.css';
const Sidebar=()=>{
  return (
    <aside>
        <span><FaFilter/></span><span> Filter</span>
        <div>
            <table className="sidebar-table">
                <tr>
                    <td>
                        <span>Logged</span>
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Any time
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Event level</span>
                    </td>
                    <td style={{textAlign:`left`,paddingLeft:`2rem`}}>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1">Information</label><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Warning</label><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Verbose</label><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Error</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Computers</span>
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            </table>
        </div>
        
        
    </aside>
  )
}

export default Sidebar