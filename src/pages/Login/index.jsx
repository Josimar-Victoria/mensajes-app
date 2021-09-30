import { Button } from '@material-ui/core';
import React from 'react'
import { auth, provider } from '../../firebase';
import style from "./styles.module.css";
export default function Login() {

    const signi = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }

    return (
        <div className={style.login}>
            <div className={style.login__logo}>
                <img src='https://svgsilh.com/svg/303206-03a9f4.svg' alt='logi'/>
                <h1>Message App</h1>
            </div>
            <Button onClick={signi}>Iniciar Secion</Button>
        </div>
    )
}
