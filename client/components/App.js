import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import style from '../style.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from "./layout/Dashboard";
import {Provider} from 'react-redux';
import store from '../store';
import Alert from '../components/layout/Alert'
import {loadUser} from '../actions/auth'
import PrivateRoute from '../route/PrivateRoute';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <section className="container">
              <Alert />
            
                <Route exact path='/register/' component={Register} />
                <Route exact path='/login/' component={Login} />
                <PrivateRoute exact path='/dashboard/' component={Dashboard} />
           
            </section>
            </Switch>
        </Fragment>
      </Router>
      </Provider>
    );
  }
}

render(<App /> , document.querySelector('#root'));

export default App;