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
    //   const getData = async () => {
//     try {
//       const res = await axios.get(
//         `https://swapi.dev/api/people`
//       );

//       setChart({
//         labels: [Object.keys(res.data.timeline.cases)],
//         datasets: [
//           {
//             label: "Data People",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(75,192,192,0.4)",
//             borderColor: "rgba(75,192,192,1)",
//             borderCapStyle: "butt",
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: "miter",
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: Object.values(res.data.timeline.cases)
//           }
//         ]
//       });
//     } catch (error) {
//       console.log(error.response);
//     }
//   };


export default PeopleGraph;