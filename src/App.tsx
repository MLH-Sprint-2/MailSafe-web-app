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
  const [domainsLoading, setDomainsLoading] = useState(false);
  const [domainsLoadingError, setDomainsLoadingError] = useState(false);

  useEffect( () => {
    const fetchDomains = async () => {
      setDomainsLoading(true);
      try {
        const result = await getDomains();
        if (result) setDomains(result);
      } catch(error) {
        setDomainsLoadingError(true);
      }
      finally {
        setDomainsLoading(false);
      }
    }

    fetchDomains();
  }, []);

  const domainsLoadingErrorMessage = <p>There was an error loading the domains. Try again later.</p>

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
                { domainsLoadingError ? domainsLoadingErrorMessage : <Aliases domains={domains}/> }
              </Route>
              <Route path="/">
                { domainsLoadingError ? domainsLoadingErrorMessage : <CreateAlias domains={domains}/>}
              </Route>
            </Switch>
            { domainsLoading && <p>Domains Loading...</p>}
          </Landing>
        </div>
      </div>

    </Router>
  )
}

export default App;