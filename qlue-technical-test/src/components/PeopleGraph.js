import React, { useState, useEffect } from "react";
import 'zingchart/es6'; 

import { Line } from "react-chartjs-2";

const PeopleGraph = () => {
  const [chart, setChart] = useState({});

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => { 
     let charName = [];
     let charHeight = []; 
      fetch(`https://swapi.dev/api/people/`,{method: 'GET'}).then(res => { 
          return res.json();
        
        }).then(data => { 
            const carDatas = data.results; 
            for (const dataObj of carDatas)  { 
                charName.push(dataObj.name)
                charHeight.push(parseInt(dataObj.height))
            }
            setChart({ 
                labels: charName, 
                datasets: [ 
                    { 
                        label: 'Name and Height of Peoples',
                        data: charHeight, 
                        backgroundColor: 'gradient',
                        borderWidth: 3
                    }
                ] 
            })
        })
        .catch(err => { 
            console.log(err, '<<<err')
        })
    }
  return (
    <>
        <Line
            data={chart}
            options={{
                responsive: true,
                title: { text: "chart of name vs height of peoples in starwars dataset", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true
                      },
                      gridLines: {
                        display: false
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      }, 
                      label: {
                          title: 'Name'
                      }
                    }
                  ]
                }
              }}
        />
    </>
  );
}

export default PeopleGraph;