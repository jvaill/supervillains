import {Map} from 'immutable';
import {GET_INFO, RECEIVE_INFO, GET_HEAD_INFO, RECEIVE_HEAD_INFO, SET_STATE} from './actions';

function getVillainInfo(state = Map(), action) {
    var existingVillain = state.get(parseInt(action.id));
    switch (action.type) {
        case GET_INFO:
        console.log("GET_INFO " + JSON.stringify(action));
          var updatedVillain = Object.assign({}, existingVillain, {
            isFetching: true,
            fetched: false
          });
          var newState = state.set(action.id, updatedVillain);
          console.log("New state:");
          console.log(JSON.stringify(newState));
          return newState;
        case RECEIVE_INFO:
          console.log("RECEIVE_INFO action " + JSON.stringify(action));
          console.log("RECEIVE_INFO state " + JSON.stringify(state));
          var updatedVillain = Object.assign({}, existingVillain, {
            isFetching: false,
            fetched: true,
            villains: action.villains,
            lastUpdated: action.receivedAt
          })
          var newState = state.set(action.id, updatedVillain);
          console.log("New state:");
          console.log(JSON.stringify(newState));
          return newState;
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
                villains = villains.set(
                    villain.id, {
                        'name': villain.name,
                        'id': villain.id,
                        'isFetching': 'false',
                        'fetched': 'false',
                        'lastUpdated': action.receivedAt
                        });
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
            console.log("reducer GET or RECEIVE _INFO");
            console.log("state: " + JSON.stringify(state));
            console.log("id: " + action.villainId);
            return Object.assign({}, state, {
                villains: getVillainInfo(state.villains, action)
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