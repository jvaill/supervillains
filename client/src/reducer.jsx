import {Map} from 'immutable';
import {GET_INFO, RECEIVE_INFO, SET_STATE} from './actions';

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
          })
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

export default function (state = {}, action) {
    switch (action.type) {
        case GET_INFO:
        case RECEIVE_INFO:
            return Object.assign({}, state, {
                [action.villainId]: getVillainInfo(state[action.villainId], action)
            })
        case SET_STATE:
            return Object.assign({}, state, action.state)
        default:
            return state
    }
}