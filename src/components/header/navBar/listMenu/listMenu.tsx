import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Union from '../../../../img/Union.png'
import style from '../navBar.module.scss'
import avatar from '../../../../img/avatar.svg'
import schedule from '../../../../img/schedule.svg'
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { GetUser } from '../../../../redux/reducers/auth-reducer'



const Menu: React.FC<MapStateType> = ({ firstName, secondName }) => {
    return (
        <div className={style.wrapper}>
            <ul className={style.menu_wrapper}>
                <li className={`${style.menu_item} ${style.menu_item_proc}`}>
                    <i className={style.item_container}>
                        <img src={Union} alt="Union" />
                    </i>
                    <span className={style.item_text}>proceset</span>
                </li>

                <li className={style.menu_item}>
                    <i className={style.item_container}>
                        <img src={avatar} alt="avatar" />
                    </i>
                    <NavLink to="/Profile" className={style.item_text} >
                        {`${firstName} ${secondName}`}
                    </NavLink>
                </li>

                <li className={style.menu_item}>
                    <i className={style.item_container}>
                        <img src={schedule} alt="schedule" />
                    </i>
                    <NavLink to="/Process" className={style.item_text}>
                        Список процессов
              </NavLink>
                </li>
            </ul>
        </div>
    );
}

type MapStateType = {
    firstName: string | null
    secondName: string | null
}
type MapDispatchType = {
    GetUser: () => void
}

const ListMenu: React.FC<MapStateType & MapDispatchType> = ({ firstName, secondName, ...props }) => {
    useEffect(() => {
        props.GetUser()
    })
    return <Menu firstName={firstName} secondName={secondName} />
}
const mapStateToProps = (state: AppStateType) => ({
    firstName: state.auth.firstName,
    secondName: state.auth.secondName,
})

export default connect(mapStateToProps, { GetUser })(ListMenu)