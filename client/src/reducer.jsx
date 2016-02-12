import {Map} from 'immutable';
import {GET_INFO, RECEIVE_INFO, GET_HEAD_INFO, RECEIVE_HEAD_INFO, SET_STATE} from './actions';

function getVillainInfo(state = Map(), action) {
    var existingVillain = state.get(parseInt(action.villainId));
    switch (action.type) {
        case GET_INFO:
            var updatedVillain = Object.assign({}, existingVillain, {
                isFetching: true,
                fetched: false
            });
            // TODO:Find out why isFetching doesn't update
            var newState = state.set(action.villainId, updatedVillain);
            return newState;
        case RECEIVE_INFO:
            // Update the villain in question
            var updatedVillain = Object.assign({}, existingVillain, {
                    isFetching: false,
                    fetched: true,
                    villains: action.villains,
                    lastUpdated: action.receivedAt
                });
            var newState = state.set(action.villainId, updatedVillain);
            // Also update the master list of villains
            action.villains.forEach(function(villain)
            {
                newState = newState.set(
                    villain.id, {
                        'name': villain.name,
                        'id': villain.id,
                        'isFetching': 'false',
                        'fetched': 'false',
                        'lastUpdated': action.receivedAt
                        });
            });
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
                villains: getVillainInfo(state.villains, action)
            })
        case GET_HEAD_INFO:
            return state;
        case RECEIVE_HEAD_INFO:
            return Object.assign({}, state, {
                villains: getBosses(state.villains, action)
            });
        case SET_STATE:
            return Object.assign({}, state, action.state)
        default:
            return state
    }
}