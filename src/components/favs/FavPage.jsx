import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { useSelector } from 'react-redux'

function FavPage() {
    const characters = useSelector(state => state.characters.favorites)
    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }
    return (
        <div className={styles.box}>
            <h2>Favoritos</h2>
            <div className={styles.container}>
                {characters.map(renderCharacter)}
                {!characters.length && <h3>No hay personajes agregados</h3>}
            </div>
        </div>
    )
}



export default FavPage