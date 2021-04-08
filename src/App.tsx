import React, { useState, useEffect } from 'react';

import { 
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

import './assets/index.css';

/* pages */
import Content from './container/content/Content'

/* components */
import CreateAlias from './components/createAlias/CreateAlias';
import Aliases from './components/aliases/Aliases';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';

/* api */
import { getDomains } from './api/mailSafe';
import Landing from './pages/landing/Landing';


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
  return (
    <Router>
      <div className="container">

        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Switch>
          
          {/* <Route path="/login">
            { isLoggedIn ? <Redirect to="/create-alias" /> : <Content><Login setIsLoggedIn={setIsLoggedIn} /></Content> }
          </Route>

          <Route path="/sign-up">
            { isLoggedIn ? <Redirect to="/create-alias" /> : <Content><Login setIsLoggedIn={setIsLoggedIn} /></Content> }
          </Route> */}

          <Route path="/aliases">
            { isLoggedIn ? 
              (domainsLoadingError ? domainsLoadingErrorMessage : <Content><Aliases domains={domains}/></Content> ) :
              <Redirect to="/login" />
            }
          </Route>
          <Route path="/create-alias">
            { isLoggedIn ? 
              (domainsLoadingError ? domainsLoadingErrorMessage : <Content><CreateAlias domains={domains}/></Content>) :
              <Redirect to="/login" />
            }
          </Route>
          
          <Route path="/login">
            { isLoggedIn ? <Redirect to="/" /> : <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} type="login"/> }
          </Route>

          <Route path="/sign-up">
            { isLoggedIn ? <Redirect to="/" /> : <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} type="sign-up"/> }
          </Route>

          <Route path="/">
            { !isLoggedIn ? <Redirect to="/sign-up" /> : <Landing isLoggedIn={isLoggedIn} type="none"/> }
          </Route>
          
        </Switch>
        { domainsLoading && <p>Domains Loading...</p>}

      </div>
    </Router>
  )
}

export default App;