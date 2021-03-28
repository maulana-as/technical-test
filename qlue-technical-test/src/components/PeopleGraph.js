import React, { useState, useEffect } from 'react';
import Chart from './chart';
import './index.css';


function PeopleGraph() { 
    
    const [stateData, setStateData] = useState({});

    useEffect(() => { 
       async function getData ()  {
           const res = await fetch(`https://swapi.dev/api/people`)
           const data = await res.json();
           setStateData(data);
       };
       getData();
    }, []);

    
    return ( 
        <div> 
            <Chart data={stateData} />
        </div>
    )

}

export default PeopleGraph;