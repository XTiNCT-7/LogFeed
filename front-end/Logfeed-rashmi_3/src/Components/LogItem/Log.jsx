import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearch } from 'react-icons/bi';
import LogItem from './LogItem';
import './LogItem.css';
import LogSummary from './LogSummary';
import './Log.css'

// const data = [
//     "03/22 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP",
//     "03/23 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for ",
//     "03/24 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP via UDP",
//     "03/24 08:51:06 WARNING :.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.",
//     "03/24 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for rsvp-udp",
//     "04/24 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized"
// ]

const maxLogsInPage = 3

const Log = ({time}) => {
   
    console.log(time.time)
    console.log(time.system)
    const [filterData,setFilterData]=useState([]);
    
    const [searchItem, setSearchItem] = useState("");
    const [jsonData, setJsonData] = useState([]);
    const [pageSize, setPageSize] = useState(jsonData.length/maxLogsInPage)
    const [paginationNum, setPaginationNum] = useState([])
    const [pageJsonData,setPageJsonData] = useState([])
    const [activePage,setActivePage] = useState(1)
    const [logData, setLogData] = useState([])
    const[fetchTime,setFetchTime] = useState();


    useEffect(() => {
        if(time.time!==0){
            getDataByTime(time.time);
        }
        if(time.system!==""){
            getDataBySystem(time.system);
        }
    }, [time])

    const getDataByTime=async (time)=>{
        const response=await fetch('http://localhost:8084/logs/getByTime/'+Number(time));
        const jsonData=await response.json();
        setLogData([jsonData]);
    }

    const getDataBySystem=async(system)=>{
        const response=await fetch('http://localhost:8084/logs/getBySystem/'+system);
        const jsonData=await response.json();
        console.log(jsonData)
        if(Array.isArray(jsonData)){
            setLogData([...jsonData])
        }else{
            setLogData([jsonData])
        }
        
    }

    const handleClick = async () => {
        try {
            // Call the first API to start the process
            await fetch('http://localhost:8084/logs/start', { method: 'GET' })
            .then((data)=>{
                console.log(data)
            });
      
            // Call the second API to end the process
            await fetch('http://localhost:8084/logs/stop', { method: 'GET' });
      
            // Call the third API to retrieve data
            const response = await fetch('http://localhost:8084/logs');
            const jsonData = await response.json();
            setLogData(jsonData);
            setFetchTime(new Date().getTime());

          } catch (error) {
            console.error('Error:', error);
          }
        };

    let debounceTimeout = null;
    const debounce = (func, delay) => {

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(func, delay);
    }

    const [totalData, setTotalData] = useState([]);

    

    useEffect(()=>{
        setPageSize(jsonData.length/maxLogsInPage)
        let paginations = []
        for( let i=1;i<=pageSize;i++){
            paginations.push(i)
        }
        setPaginationNum(paginations)
    },[jsonData, pageSize])

    useEffect(()=>{
        let parsedData2 = []
        for(let i=maxLogsInPage*(activePage-1);i<maxLogsInPage*(activePage) && i<jsonData.length;i++){
            parsedData2.push(jsonData[i])
        }
        setPageJsonData(parsedData2)
    },[activePage,jsonData])


    const setSearchLogs =  async(value) => {
        console.log(value)
        setSearchItem(value);
        // debounce(async () => {

            // let temp = data.filter(async (field) => {
                console.log(searchItem)

                const da=await fetch("http://localhost:8084/logs/searchLogs/"+value,{
                    method:"GET"
                })
                const jsonData = await da.json();
                // const matchSearch = field.toLowerCase().includes(searchItem.toLowerCase());
                // const matchFilter=filterData.includes(field);
                // return matchSearch;

            // })
            setLogData(jsonData);
        // }, 1000)



    };

    const deleteLog = (index) => {
        const updatedData = [...jsonData];
        updatedData.splice(index, 1);
        setJsonData(updatedData);

        //alert("Log deleted successfully")
    }


    return (
        <div>
            <div>
                <InputGroup className="mb-3 search">
                    <Form.Control
                        placeholder="Search"
                        value={searchItem}
                        onChange={(e) => {
                            setSearchLogs(e.target.value);
                        }}
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2" ><BiSearch /></InputGroup.Text>
                </InputGroup>
            </div>

            <LogSummary length={logData.length} time={fetchTime} />

            <div className='mt-4'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
                        <li>
                            <button onClick={handleClick} type='button' className='btn btn-info' style={{marginRight : 570}}>Get Logs</button>
                        </li>
                        <li className="page-item">
                            <button className={activePage===1 ? "page-link disabled" : "page-link"} aria-disabled="true" 
                            onClick={()=>{setActivePage(activePage-1)}}>Previous</button>
                        </li>
                        {
                            paginationNum.map((page)=>{
                              return  <li className="page-item" key={"page"+page}>
                                <button className={activePage===page ? "page-link active" : "page-link"  }
                              onClick={()=>{
                                    setActivePage(page)
                              }}>{page}</button></li>
                            })
                        }
                        <li className="page-item">
                            <button className={activePage===pageSize ? "page-link disabled" : "page-link"} onClick={()=>{setActivePage(activePage+1)}}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='bg-white rounded overflow-hidden mt-0'>
                <table className="table table-hover" >
                    <thead>
                        <tr className='bg-header text-white'>
                            
                            <th className='col-2'>Timestamp</th>
                            <th className='col-2 '>Level</th>
                            <th className='col-2 '>System name</th>
                            <th className='col-6 '>Log message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageJsonData.map((i, index) => {
                            return (
                                <LogItem data={i} index={index} deleteLog={deleteLog} key={index} />
                            )
                        })}

                        {logData.map((item) => (
                                    <tr key={item.id}>
                                    <td>{item.timestamp}</td>
                                    <td>{item.level}</td>
                                    <td>{item.systemName}</td>
                                    <td>{item.message}</td>
                                    </tr>
                                ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Log