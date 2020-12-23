import React from 'react'
import preloader from '../img/preloader.svg'
import style from './preloader.module.scss'

export const Preloader = () => {
    return <div className={style.Preloader}><img src={preloader} alt="preloader" /></div>
}