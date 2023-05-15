import React from 'react'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Log from './LogItem/Log';

import './home.css';
import {LazyLog} from 'react-lazylog';

const Home=()=>{
    const file='db.log';
  return (
   <>
        <Header/>
        <main>
            <Sidebar/>
            <section>
                {/* <div style={{ height: 500, width: 902 }}>
                    <LazyLog extraLines={1} text={file} caseInsensitive />
                </div> */}
                <Log/>
            </section>
        </main>
    </>
  )
}

export default Home