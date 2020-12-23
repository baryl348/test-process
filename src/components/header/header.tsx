import React from 'react'
import style from './header.module.scss'
import NavBar from './navBar/navBar'




export const Header: React.FC = () => {
    return (
        <header className={style.head}>
            <div className={style.head_menu}>
                <NavBar />
            </div>
        </header>
    )
}


