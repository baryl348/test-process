import React, { useState } from 'react'
import style from './navBar.module.scss'
import Union from '../../../img/Union.png'
import ListMenu from './listMenu/listMenu'


const NavBar: React.FC = (props) => {
    const [dropMenu, setDropMenu] = useState<boolean>(false)
    const active = () => {
        setDropMenu(true)
    }
    const deactivate = () => {
        setDropMenu(false)
    }

    return (
        <div>
            {dropMenu ? <div onClick={deactivate}><ListMenu /></div> : <div className="button" onClick={active} >
                <div><i><img src={Union} alt='union' /></i><span className={style.item_menu}>Меню</span></div>
            </div>}
        </div>
    )
}

export default NavBar