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


class App extends Component {

  componentDidMount(){
    console.log('mounted');
    this.props.fetchUser();
}

  render() {
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

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps,{fetchUser})(App);

/* 
<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */