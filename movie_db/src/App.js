import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Movie from './Movie';
import {Router,Route,Link,browserHistory} from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          <Route path="/movie" component={Movie}/>
        </Router>     
      </div>
    );
  }
}



export default App;
