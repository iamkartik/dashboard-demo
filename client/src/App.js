import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import {connect} from 'react-redux';
import {fetchUser} from './actions';

/**
 * This class is the root of the application all routes are defind here
 */
class App extends Component {
  // checking if user is already logged in with current_user api once the app loads
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    // frontend routing amongst components
    return (
      <BrowserRouter>
        <Switch>
            <Route exact key="0" path="/" component={Login}/>
            <Route exact key="1" path="/home" component={Home}/>
            <Route exact key="2" path="/page/one" component={PageOne}/>
            <Route exact key="3" path="/page/two" component={PageTwo}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
// getting redux state to map to props
function mapStateToProps(state){
  return state;
}
// wiring up the react and redux state
export default connect(mapStateToProps,{fetchUser})(App);

