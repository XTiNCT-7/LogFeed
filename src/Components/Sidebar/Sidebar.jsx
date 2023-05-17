import React,{useState,useEffect} from 'react'
import {FaFilter} from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './sidebar.css';
const Sidebar=({onFilter})=>{

    const [date,setDate]=useState([]);
    const [level,setLevel]=useState([]);
    const filterData=[];
    const jsonFilterData={};
    // useEffect(() => {
        // const setFilterData=(e)=>{
        //     const checkedLevel=[...level];
        //     if(e.target.checked){
        //         checkedLevel.push(e.target.value);
        //     }else{
        //         const index=checkedLevel.indexOf(e.target.value);
        //         if(index>-1){
        //             checkedLevel.splice(index,1);
        //         }
        //     }
        //     setLevel(checkedLevel);
        //     console.log(level)
        //     // onFilter();
        // }
    
      
    // }, [level])
    
    const setDateData=(value)=>{
        // console.log(value)
        var now = new Date();
        var then = new Date(now.setHours(now.getHours() - value));
       
        // console.log(then)
        setDate(then);
        // console.log(date,"date")
    }

    const setLevelData=(e)=>{
        const checkedLevel=[...level];
        if(e.target.checked){
            checkedLevel.push(e.target.value);
        }else{
            const index=checkedLevel.indexOf(e.target.value);
            if(index>-1){
                checkedLevel.splice(index,1);
            }
        }
        setLevel(checkedLevel);
        // jsonFilterData.checklevel=level;
       
        console.log(level)
        // onFilter();
    }
    onFilter(level,date)
    console.log(onFilter,"onfilter")
    useEffect(() => {
        // Perform any actions based on the updated `level` state
        console.log(level);
      }, [level]);
    
  return (
    <aside>
        <div className='title'>
            Dashboard
        </div>
        
        <div className="filter">
            <span><FaFilter/></span><span className='filter-title'> Filter Logs</span>
        </div>
        <div>
            <table className="sidebar-table">
                <tr>
                    <td>
                        <span>Logged</span>
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {date.toLocaleString()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e)=>{setDateData(1)}}>Last hour</Dropdown.Item>
                                <Dropdown.Item onClick={(e)=>{setDateData(24)}}>Last 24 hours</Dropdown.Item>
                                <Dropdown.Item onClick={(e)=>{setDateData(360)}}>Last 15 days</Dropdown.Item>
                                <Dropdown.Item onClick={(e)=>{setDateData(720)}}>Last 30 days</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Event level</span>
                    </td>
                    <td style={{textAlign:`left`,paddingLeft:`2rem`}}>
                        <input type="checkbox" id="level1" name="information" value="information" onChange={(e)=>{setLevelData(e)}} />
                        <label for="level1">Information</label><br/>
                        <input type="checkbox" id="level2" name="warning" value="warning" onChange={(e)=>{setLevelData(e)}}/>
                        <label for="level2"> Warning</label><br/>
                        <input type="checkbox" id="level3" name="Verbose"value="verbose"  onChange={(e)=>{setLevelData(e)}}/>
                        <label for="level3"> Verbose</label><br/>
                        <input type="checkbox" id="level4" name="Error" value="error"  onChange={(e)=>{setLevelData(e)}}/>
                        <label for="level4"> Error</label>
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