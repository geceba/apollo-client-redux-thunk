import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { removeCharacterAction, addToFavoitesAction } from '../../redux/chars/charsAction'
function Home() {
    const chars = useSelector(state => state.characters.array)
    const dispatch = useDispatch()

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card
                rightClick={addFav}
                leftClick={nextCharacter}
                {...char}
            />
        )
    }

    function nextCharacter() {
        dispatch(removeCharacterAction())
    }

    function addFav() {
        dispatch(addToFavoitesAction())
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

export default Home