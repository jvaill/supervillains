import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    console.log("SET_STATE");
    return setState(state, action.state);
  case 'DRILLDOWN':
    console.log("DRILLDOWN");
    // TODO: Make a request to get villain's information
    return setState(state, action.state);
  }
  return state;
}