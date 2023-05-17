import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BiSearch} from 'react-icons/bi';
import LogItem from './LogItem';
import './LogItem.css';
import LogSummary from './LogSummary';
import './Log.css'



const Log=({levelFilterData,dateFilterData})=> {
    const filterData=[];
    filterData.push(levelFilterData,dateFilterData);
    console.log("log",filterData)
    
    const [searchItem, setSearchItem]=useState("");
    
    

    let debounceTimeout = null;
    const debounce=(func, delay)=>{
    
        clearTimeout(debounceTimeout);
        debounceTimeout=setTimeout(func,delay);
    }


    
    // useEffect(()=>{
    //     if(filterData[0].length!=0){
    //         setFilterLogs();
    //     }
    // },[filterData])

    
    const data=[
            "03/22 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP",
            "03/23 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for ",
            "03/24 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP via UDP",
            "03/24 08:51:06 WARNING :.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.",
            "03/24 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for rsvp-udp",
            "04/24 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized"
        ]
    
    const [totalData,setTotalData]=useState(data);
   
    const jsonData = [];

    totalData.forEach((logEntry) => {
    const logObject = {};
    const logComponents = logEntry.split(" ");
    logObject.date = logComponents[0];
    logObject.time = logComponents[1];
    logObject.level = logComponents[2];
    logObject.message = logComponents.slice(4).join(" ");
    
    jsonData.push(logObject);
    });
    
    
    const setFilterLogs=()=>{
        let temp=data.filter((field)=>{
            // let matchFilter=false;
            const values = [...filterData[0]];
            // console.log(values[0])
            console.log(field.level)
            if(values.includes(field.level)){
                // matchFilter=true;
                return true;
            }
            // }else if(values.includes("warning") && field.includes("Warning".toUpperCase())){
            //     // matchFilter=true;
            // }else if(values.includes("verbose") && field.includes("verbose".toUpperCase())){
            //     console.log("true")
            // }
            // else if([...filterData].includes("trace") && field.includes("trace".toUpperCase())){
            //     console.log("true")
            // }

            // const matchFilter=filterData.includes(field);
            // console.log(matchFilter)
            // return matchFilter;
        })
        setTotalData(temp);
        
    }
    // setFilterLogs();
    

    const setSearchLogs=(value)=>{
        console.log(value)
        setSearchItem(value);
        debounce(()=>{
            
            let temp=data.filter((field)=>{
                console.log("timeout",debounceTimeout)
                const matchSearch=field.toLowerCase().includes(searchItem.toLowerCase());
                // const matchFilter=filterData.includes(field);
                return matchSearch;
                
            })
            setTotalData(temp);
        },1000)
        
    };

    
    

    
    console.log("filterdata",jsonData);
    
  return (
    <div>
        <div>
            <InputGroup className="mb-3 search">
                <Form.Control
                placeholder="Search"
                value={searchItem}
                onChange={(e)=>{
                    setSearchLogs(e.target.value);
                }}
                aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2" ><BiSearch/></InputGroup.Text>
            </InputGroup>
        </div>

        <LogSummary length={data.length} time={"time"} />

        <div className='mt-3 bg-white rounded overflow-hidden m-1'>
        <table className="table table-hover" >
            <thead>
                <tr className='bg-header text-white'>
                <th className='col-1'>Select</th>
                <th className='col-2'>Date</th>
                <th className='col-2'>Time</th>
                <th className='col-2'>Level</th>
                <th className='col-5'>Logs</th>
                </tr>
            </thead>
       
        
        <tbody>
            {jsonData.map((i,index)=>{
                console.log(index)
                return(
                   
                        <LogItem data={i} index={index}/>
                    
                )
            })}
           
           </tbody>
      
        
        </table>
        </div>
    </div>
  )
}

export default Log