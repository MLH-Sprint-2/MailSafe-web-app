import React, { useState, useEffect } from 'react';

import { 
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link 
} from 'react-router-dom';

import './assets/index.css';

/* pages */
import Landing from './pages/landing/Landing'

/* components */
import CreateAlias from './components/createAlias/CreateAlias';
import Aliases from './components/aliases/Aliases';
import Login from './components/login/Login';

/* api */
import { getDomains } from './api/mailSafe';


const App = () => {
  const [domains, setDomains] = useState(["Loading"]);
  const [domainsLoading, setDomainsLoading] = useState(false);
  const [domainsLoadingError, setDomainsLoadingError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const logout = () => {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            { isLoggedIn ? (
              <>
                <li>
                  <Link to="/create-alias">Add Alias</Link>
                </li>
                <li>
                  <Link to="/aliases">Fetch Aliases</Link>
                </li>
                <li>
                  <span onClick={logout}>Logout</span>
                </li>
              </>
            ) :
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            }
          </ul>
        </nav>

        <div className="content-container">
          <Landing>
            <Switch>

              <Route path="/login">
                { isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} /> }
              </Route>

              <Route path="/aliases">
                { isLoggedIn ? 
                  (domainsLoadingError ? domainsLoadingErrorMessage : <Aliases domains={domains}/> ) :
                  <Redirect to="/login" />
                }
              </Route>
              <Route path="/create-alias">
                { isLoggedIn ? 
                  (domainsLoadingError ? domainsLoadingErrorMessage : <CreateAlias domains={domains}/>) :
                  <Redirect to="/login" />
                }
              </Route>

              <Route path="/">
                <Redirect to="/create-alias" />
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