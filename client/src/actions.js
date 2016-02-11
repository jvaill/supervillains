import fetch from 'isomorphic-fetch'
var Immutable = require('immutable')

export const SET_STATE = 'SET_STATE'

export const GET_INFO = 'GET_INFO'
function getInfo(villainId) {
    console.log(GET_INFO)
    return {
        type: GET_INFO,
        villainId
    }
}

export const GET_HEAD_INFO = 'GET_HEAD_INFO'
function getHeadInfo() {
    console.log(GET_HEAD_INFO)
    return {
        type: GET_HEAD_INFO
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
        villains: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export const RECEIVE_HEAD_INFO = 'RECEIVE_HEAD_INFO'
function receiveHeadInfo(json) {
    console.log(RECEIVE_HEAD_INFO)
    console.log(JSON.stringify(json))
    return {
        type: RECEIVE_HEAD_INFO,
        villains: json,
        receivedAt: Date.now()
    }
}

export function fetchBosses() {
    console.log("fetchBosses");
    return function (dispatch) {
        // Dispatch an action that we're getting information
        dispatch(getHeadInfo())
        return fetch(`${location.protocol}//${location.hostname}:3000/villain-hierarchy`)
            .then(response => response.json())
            .then(json => dispatch(receiveHeadInfo(json))
        ); // TODO: Handle errors
    }
}

export function fetchVillainInfo(villainId) {
    console.log("fetchVillainInfo " + villainId);
    return function (dispatch) {
        // Dispatch an action that we're getting information
        dispatch(getInfo(villainId))
        return fetch(`${location.protocol}//${location.hostname}:3000/villain-hierarchy/${villainId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveInfo(villainId, json))
        ); // TODO: Handle errors
    }
}

function shouldFetchVillainInfo(state, villainId) {
    console.log("shouldFetchVillainInfo " + villainId);
    var villain = state.villains.get(String(villainId)); // TODO: is there a better way to access this data?
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

// TODO: Hook it up to the villain component
// TODO: Figure out how getState() and Promise work
export function getInfoIfNeeded(villainId) {
    console.log("getInfoIfNeeded " + villainId);
    return (dispatch, getState) => {
        if (shouldFetchVillainInfo(getState(), villainId)) {
            return dispatch(fetchVillainInfo(villainId))
        }
        else {
            return Promise.resolve()
        }
    }
}