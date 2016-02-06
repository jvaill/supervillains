import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'immutable';
import Router, {Route} from 'react-router';
import App from './components/App';
import Organization from './components/Organization';
import Villain from './components/Villain';

const routes = <Route component={App}>
  <Route path="/" component={Organization} />
  <Route path="/:id" component={Villain} />
</Route>;

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);