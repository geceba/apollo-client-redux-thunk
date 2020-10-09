import * as ACTION_TYPES from './types';
import ApolloClient, { gql } from 'apollo-boost'
import { updateDB, getFavs } from '../../firebase'


let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
})

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
    // ?? donde estan lo ch
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

export let getCharactersAction = () => (dispatch, getState) => {
    let query = gql`
    query ($page:Int){
        characters(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            image
          }
        }
      }
    `
    dispatch({
        type: ACTION_TYPES.GET_CHARACTERS
    })
    let { nextPage } = getState().characters
    return client.query({
        query,
        variables: { page: nextPage }
    })
        .then(({ data, error }) => {
            if (error) {
                dispatch({
                    type: ACTION_TYPES.GET_CHARACTERS_ERROR,
                    payload: error
                })
                return
            }
            dispatch({
                type: ACTION_TYPES.GET_CHARACTERS_SUCCESS,
                payload: data.characters.results
            })
            console.log(data.characters.info.next)
            dispatch({
                type: ACTION_TYPES.UPDATE_PAGE,
                payload: data.characters.info.next ? data.characters.info.next : 1
            })
        })
}