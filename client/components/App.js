import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import style from '../style.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <section className="container">
              <Switch>
                <Route exact path='/register/' component={Register} />
                <Route exact path='/login/' component={Login} />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

render(<App /> , document.querySelector('#root'));

export default App;