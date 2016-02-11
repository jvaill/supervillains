import {Map} from 'immutable';
import {GET_INFO, RECEIVE_INFO, GET_HEAD_INFO, RECEIVE_HEAD_INFO, SET_STATE} from './actions';

function getVillainInfo(state = {
  isFetching: false,
  fetched: false,
  wiseGuys: [],
}, action) {
    switch (action.type) {
        case GET_INFO:
          return Object.assign({}, state, {
            isFetching: true,
            fetched: false
          });
        case RECEIVE_INFO:
          return Object.assign({}, state, {
            isFetching: false,
            fetched: true,
            wiseGuys: action.wiseGuys,
            lastUpdated: action.receivedAt
          })
        default:
          return state
    }
}

function getBosses(state = Map(), action) {
    switch (action.type) {
        // TODO: always overwrite existing villains
        case RECEIVE_HEAD_INFO:
            var villains = Map();
            console.log("Processing: " + JSON.stringify(action.villains));
            action.villains.forEach(function(villain)
            {
                villains = villains.set(villain.id, {'name': villain.name});
            });
            console.log("New bosses: " + JSON.stringify(villains));
            return villains;
        default:
            return state;
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_INFO:
        case RECEIVE_INFO:
            return Object.assign({}, state, {
                [action.villainId]: getVillainInfo(state[action.villainId], action)
            })
        case GET_HEAD_INFO:
            console.log("reducer GET_HEAD_INFO");
            return state;
        case RECEIVE_HEAD_INFO:
            console.log("reducer RECEIVE_HEAD_INFO");
            return Object.assign({}, state, {
                villains: getBosses(state.villains, action)
            });
        case SET_STATE:
            return Object.assign({}, state, action.state)
        default:
            return state
    }
}