import React from 'react';
import * as ACTION_TYPES from './types';
import client from '../../client/apolloClient'
import { updateDB, getFavs } from '../../firebase'
import { GET_CHARS } from './graphql'


// actions (thunks)
export let retreiveFavs = () => (dispatch, getState) => {
    dispatch({
        type: ACTION_TYPES.GET_FAVS
    })
    let { uid } = getState().user
    return getFavs(uid)
        .then(array => {
            dispatch({
                type: ACTION_TYPES.GET_FAVS_SUCCESS,
                payload: [...array]
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: ACTION_TYPES.GET_FAVS_ERROR,
                payload: e.message
            })
        })
}

export let addToFavoitesAction = () => (dispatch, getState) => {
    let { array, favorites } = getState().characters
    let { uid } = getState().user
    let char = array.shift()
    favorites.push(char)
    updateDB(favorites, uid)
    dispatch({
        type: ACTION_TYPES.ADD_TO_FAVORITES,
        payload: { array: [...array], favorites: [...favorites] }
    })
}

export let removeCharacterAction = () => (dispatch, getState) => {
    let { array } = getState().characters
    array.shift()
    if (!array.length) {
        getCharactersAction()(dispatch, getState)
        return
    }
    dispatch({
        type: ACTION_TYPES.REMOVE_CHARACTER,
        payload: [...array]
    })

}

export let getCharactersAction = () => async (dispatch, getState) => {

    let { nextPage } = getState().characters

    try {
        dispatch({
            type: ACTION_TYPES.GET_CHARACTERS
        })

        const { data } = await client.query({
            query: GET_CHARS,
            variables: { page: nextPage }
        });

        dispatch({
            type: ACTION_TYPES.GET_CHARACTERS_SUCCESS,
            payload: data.characters.results
        })
        console.log(data.characters.info.next)
        dispatch({
            type: ACTION_TYPES.UPDATE_PAGE,
            payload: data.characters.info.next ? data.characters.info.next : 1
        })
    } catch (error) {
        dispatch({
            type: ACTION_TYPES.GET_CHARACTERS_ERROR,
            payload: error
        })
    }
}
