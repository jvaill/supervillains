import fetch from 'isomorphic-fetch'

export const SET_STATE = 'SET_STATE'

export const GET_INFO = 'GET_INFO'
function getInfo(villainId) {
    console.log(GET_INFO)
    return {
        type: GET_INFO,
        villainId
    }
}

export const RECEIVE_INFO = 'RECEIVE_INFO'
function receiveInfo(villainId, json) {
    console.log(RECEIVE_INFO)
    console.log(json.data)
    console.log(json.data.children.map(child => child.data))
    return {
        type: RECEIVE_INFO,
        villainId,
        wiseGuys: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchVillainInfo(villainId) {
    return function (dispatch) {
        // Dispatch an action that we're getting information
        dispatch(getInfo(villainId))
        return fetch(`${location.protocol}//${location.hostname}:3000/villain/${villainId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveInfo(villainId, json))
        )
    }
}

function shouldFetchVillainInfo(state, villainId) {
    const villain = state.getInfo(villainId);
    if (!villain) {
        return true;
    }
    else if (villain.isFetching) {
        return false;
    }
    else {
        return true;
    }
}

export function getInfoIfNeeded(villainId) {
    return (dispatch, getState) => {
        if (shouldFetchVillainInfo(getState(), villainId)) {
            return dispatch(getInfo(villainId))
        }
        else {
            return Promise.resolve()
        }
    }
}