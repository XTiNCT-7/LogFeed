import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearch } from 'react-icons/bi';
import LogItem from './LogItem';
import './LogItem.css';
import LogSummary from './LogSummary';
import './Log.css'

const data = [
    "03/22 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP",
    "03/23 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for ",
    "03/24 08:51:06 INFORMATION   :.....mailslot_create: creating mailslot for RSVP via UDP",
    "03/24 08:51:06 WARNING :.....mailslot_create: setsockopt(MCAST_ADD) failed - EDC8116I Address not available.",
    "03/24 08:51:06 INFORMATION   :....mailbox_register: mailbox allocated for rsvp-udp",
    "04/24 08:51:06 TRACE  :..entity_initialize: interface 9.67.100.1, entity for rsvp allocated and initialized"
]

const maxLogsInPage = 2

const Log = () => {
    const [searchItem, setSearchItem] = useState("");
    const [jsonData, setJsonData] = useState([]);
    const [pageSize, setPageSize] = useState(jsonData.length/maxLogsInPage)
    const [paginationNum, setPaginationNum] = useState([])
    const [pageJsonData,setPageJsonData] = useState([])
    const [activePage,setActivePage] = useState(1)

    let debounceTimeout = null;
    const debounce = (func, delay) => {

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(func, delay);
    }

    const [totalData, setTotalData] = useState(data);

    useEffect(() => {
        if (jsonData.length === 0) {
            let parsedData = []
            totalData.forEach((logEntry) => {
                let logObject = {}
                const logComponents = logEntry.split(" ");
                logObject.date = logComponents[0];
                logObject.time = logComponents[1];
                logObject.level = logComponents[2];
                logObject.message = logComponents.slice(4).join(" ");

                parsedData.push(logObject);
            });
            setJsonData(parsedData)

        }

    }, [jsonData, totalData])

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


    const setSearchLogs = (value) => {
        console.log(value)
        setSearchItem(value);
        debounce(() => {

            let temp = data.filter((field) => {
                console.log("timeout", debounceTimeout)
                const matchSearch = field.toLowerCase().includes(searchItem.toLowerCase());
                // const matchFilter=filterData.includes(field);
                return matchSearch;

            })
            setTotalData(temp);
        }, 1000)

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

            <LogSummary length={jsonData.length} time={"time"} />

            <div className='mt-4'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
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
                            <th className='col-2 ps-5'>Date</th>
                            <th className='col-2'>Timestamp</th>
                            <th className='col-2 text-center'>Log Type</th>
                            <th className='col-5 ps-5'>Logs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageJsonData.map((i, index) => {
                            return (
                                <LogItem data={i} index={index} deleteLog={deleteLog} key={index} />
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Log