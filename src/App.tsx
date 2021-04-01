import React from 'react';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom';

import Example from './pages/example/Example'
import Landing from './pages/landing/Landing'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/example">Example</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/example">
            <Example />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>

    </Router>
  )
}

export default App;