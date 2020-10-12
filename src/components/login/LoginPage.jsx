import React from 'react'
import styles from './login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/user/userActions'
// { logOutAction, loggedIn, fetching, doGoogleLoginAction }
function LoginPage() {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const fetching = useSelector(state => state.user.fetching);
    const dispatch = useDispatch()

    function doLogin() {
        dispatch(doGoogleLoginAction())
    }

    function logOut() {
        dispatch(logOutAction())
    }

    if (fetching) return <h2>Cargando...</h2>
    return (
        <div className={styles.container}>
            {loggedIn ? <h1>
                Cierra tu sesión
            </h1> : <h1>
                    Inicia Sesión con Google
            </h1>}

            {loggedIn ? <button onClick={logOut} >
                Cerrar Sesión
            </button> : <button onClick={doLogin}>
                    Iniciar
            </button>}

        </div>
    )
}


export default LoginPage
