import React,{useState} from 'react'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Log from './LogItem/Log';

import './home.css';

const Home=()=>{

    const [levelFilter,setLevelFilter]=useState([]);
    const [dateFilter, setDateFilter] = useState(null);
    const handleFilter=(level,date)=>{
        setLevelFilter(level);
        setDateFilter(date);
    }
    
    // console.log("Home",filter)
    return (
    <>
            <Header/>
            <main>
                <Sidebar onFilter={handleFilter}/>
                <div>
                
                <section>
                
                    <Log levelFilterData={levelFilter} dateFilterData={dateFilter} />
                </section>
                </div>
            </main>
        </>
  )
}

export default Home