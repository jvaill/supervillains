import fetch from 'isomorphic-fetch'
var Immutable = require('immutable')

export const SET_STATE = 'SET_STATE'

export const GET_INFO = 'GET_INFO'
function getInfo(villainId) {
    return {
        type: GET_INFO,
        villainId
    }
}

export const GET_HEAD_INFO = 'GET_HEAD_INFO'
function getHeadInfo() {
    return {
        type: GET_HEAD_INFO
    }
}

export const RECEIVE_INFO = 'RECEIVE_INFO'
function receiveInfo(villainId, json) {
    // TODO: analyze villains
    return {
        type: RECEIVE_INFO,
        villainId,
        villains: json,
        receivedAt: Date.now()
    }
}

export const RECEIVE_HEAD_INFO = 'RECEIVE_HEAD_INFO'
function receiveHeadInfo(json) {
    return {
        type: RECEIVE_HEAD_INFO,
        villains: json,
        receivedAt: Date.now()
    }
}

export function fetchBosses() {
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

export function getInfoIfNeeded(villainId) {
    return (dispatch, getState) => {
        if (shouldFetchVillainInfo(getState(), villainId)) {
            return dispatch(fetchVillainInfo(villainId))
        }
        else {
            return Promise.resolve()
        }
    }
}