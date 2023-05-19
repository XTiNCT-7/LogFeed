import React from "react";



const LogFetcher = () => {
    const handleClick = async()=>{
        try {
            const res = await fetch('http://localhost:3001/log');
            const logText = await res.text();
            console.log(logText);
            const logData = parseLogData(logText);
            console.log(logData);
        } catch (error) {
            console.error("error reading file", error);
        }
    };

    const parseLogData = (logText)=>{
        return logText;
    }

  return (
    <div>
      <button onClick={handleClick}>Fetch</button>
    </div>
  );
};

export default LogFetcher;
