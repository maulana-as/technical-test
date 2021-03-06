import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {PeopleGraph, PeopleTable} from './components/index'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient(); 
queryClient.setDefaultOptions({ 
  queries: {}
})


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/people-table" className="navbar-brand">
           Qlue Test 
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/people-table"} className="nav-link">
                Table People 
              </Link>
          </li>
          <li className="nav-item">
              <Link to={"/people-graph"} className="nav-link">
                Graph People
              </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/people-graph" component={PeopleGraph}/>
          <QueryClientProvider client={queryClient}>
            <Route exact path={["/", "/people-table"]} component={PeopleTable} />
          </QueryClientProvider>
        </Switch>
      </div>
    </div>
  );
}

export default App;
