import React from 'react';
import ReactDOM from 'react-dom';
import {Map} from 'immutable';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {ConnectedOrganization} from './components/Organization';
import {ConnectedVillain} from './components/Villain';

const store = createStore(reducer);
// Temporarily initialize:
store.dispatch({
  type: 'SET_STATE',
  state: {
    villains: Map({
      13: {'name':'Don Tattaglia'},
      26: {'name':'Don Barzini'}
    })
  }
});

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