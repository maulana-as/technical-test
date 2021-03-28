import React, { useState } from 'react'; 
import { useQuery } from "react-query"
import './index.css'

const fetchPeople = async (page) => { 
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    return res.json()
}

const renderHeader = () => { 
    let headerElement = ['name', 'height', 'mass', 'hair_color', 'skin_color']; 

    return headerElement.map((ele, index) => ( 
      <th key={index}>{ele.toUpperCase()}</th>
    ))
}


const PeopleTable = () => { 

    const [page, setPage] = useState(1);

    const { data, status,  isPreviousData } = useQuery(['people', page],  () => fetchPeople(page),
    { keepPreviousData: true },
    {
      onSuccess: () => console.log("Sukses Ambil Data"),
      onError: () => console.log("Gagal Ambil Data"),
    })
    return ( 
        <>
            <h1>People Table</h1>
            { status === 'loading'  ?  (
                <div>Loading....</div>
            ) : status === 'error' ? (
                <div>Error Sewaktu Ambil Data...</div>
            ) : status === 'success' ? (
                <div>
                    { <table id="tableQlue">
                       <thead>
                           <tr>{renderHeader()}</tr>
                       </thead>
                        <tbody>
                            { 
                               data.results.map((person, index) => (
                                   <tr key={index}>
                                       <td>{person.name}</td>
                                       <td>{person.height}</td>
                                       <td>{person.mass}</td>
                                       <td>{person.hair_color}</td>
                                       <td>{person.skin_color}</td>
                                   </tr>
                               ))
                            }
                        </tbody>
                    </table> }

                    <div className="pagination">
            <button
              className="pagination__left"
              onClick={() => setPage((old) => Math.min(old - 1, old))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              className="pagination__right"
              onClick={() => {
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={!data.next}
            >
              Next
            </button>
          </div>
                </div>
            ) : null} 
        </>
    )
}

export default PeopleTable;