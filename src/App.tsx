import React, { useState, useEffect } from 'react';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom';

import './assets/index.css';

/* pages */
import Example from './pages/example/Example'
import Landing from './pages/landing/Landing'

/* components */
import CreateAlias from './components/createAlias/CreateAlias';
import Aliases from './components/aliases/Aliases';

/* api */
import { getDomains } from './api/mailSafe';


const App = () => {
  const [domains, setDomains] = useState(["Loading"]);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const fetchDomains = async () => {
      setLoading(true);
      const result = await getDomains();
      if (result) setDomains(result);
      setLoading(false);
    }

    fetchDomains();
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Add Alias</Link>
            </li>
            <li>
              <Link to="/aliases">Fetch Aliases</Link>
            </li>
          </ul>
        </nav>

        <div className="content-container">
          <Landing>
            <Switch>
              <Route path="/example">
                <Example />
              </Route>
              <Route path="/aliases">
                  <Aliases domains={domains} loading={loading} setLoading={setLoading}/>
              </Route>
              <Route path="/">
                  <CreateAlias domains={domains} loading={loading} setLoading={setLoading}/>
              </Route>
            </Switch>
            { loading && <p>Loading...</p>}
          </Landing>
        </div>
      </div>

    </Router>
  )
}

export default App;