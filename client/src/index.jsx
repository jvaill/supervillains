import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducer';
import App from './components/App';
import {ConnectedOrganization} from './components/Organization';
import {ConnectedVillain} from './components/Villain';
import {fetchBosses} from './actions';
import 'babel-polyfill'

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));
    
store.dispatch(fetchBosses())

const routes = <Route component={App}>
  <Route name="organization" path="/" component={ConnectedOrganization} />
  <Route name="villain" path="/:id" component={ConnectedVillain} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);