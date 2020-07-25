import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import style from '../style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from "./layout/Dashboard";
import { Provider } from 'react-redux';
import store from '../store';
import Alert from '../components/layout/Alert'
import { loadUser } from '../actions/auth'
import PrivateRoute from '../route/PrivateRoute';
import CreateProfile from '../components/profile-forms/createprofile';
import EditProfile from './layout/EditProfile';
import Experience from './layout/Experience'; 
import Education from './layout/Education'; 

class App extends Component {

  componentDidMount() {
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
                <Route path='/register/' component={Register} />
                <Route path='/login/' component={Login} />
                <PrivateRoute path='/dashboard/' component={Dashboard} />
                <PrivateRoute path='/create-profile/' component={CreateProfile} />
                <PrivateRoute path='/edit-profile/' component={EditProfile} />
                <PrivateRoute path='/add-experience/' component={Experience} />
                <PrivateRoute path='/add-education/' component={Education} />
              </section>
            </Switch>

          </Fragment>

        </Router>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#root'));

export default App;