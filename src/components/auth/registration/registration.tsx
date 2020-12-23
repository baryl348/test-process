import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../../common/formControls'
import { RegistrValues } from '../../../container/registration/registration'
import { email, maxLengthCreator, required } from '../../../utils/validators-type'
import style from '../login/login.module.scss'
import proceset from "../../../img/Vector (1).png";
import eye from '../../../img/glaz.png'
import openEye from '../../../img/openEye.png'




const RegistrationForm: React.FC<InjectedFormProps<RegistrValues>> = ({ handleSubmit, error }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [eyes, setEye] = useState<boolean>(false)
    const active = () => {
        setVisible(!visible)
        setEye(!eyes)
    }
    const [repeatVisible, setRepeatVisible] = useState<boolean>(false)
    const [repeateyes, setRepeatEye] = useState<boolean>(false)
    const activeRepeat = () => {
        setRepeatVisible(!repeatVisible)
        setRepeatEye(!repeateyes)
    }
    const maxLength30 = maxLengthCreator(30)

    return <div className={style.wrapper}>  <div>
        <i className={style.item_processet}>
            <img src={proceset} alt="proceset" />
        </i>
    </div>
        <div className={style.panel}>
            <div className={style.text}>
                <h1>Регистрация</h1>
            </div>
            {/* // TODO Доделать класс у Н1 */}
            <form onSubmit={handleSubmit} className={`${style.login} ${style.registration}`}>
                <div className={style.login_block}>{createField('Имя', 'firstName', [required], Input, 'text')}</div>
                <div className={style.login_block}>{createField('Фамилия', 'secondName', [required], Input, 'text')}</div>
                <div className={style.login_block}>{createField('Электронная почта', 'email', [required, email], Input, 'text')}</div>
                <div className={style.login_block}>
                    <i>
                        <img
                            src={eyes ? openEye : eye}
                            alt="eye"
                            onClick={active}
                            className={style.passwordShown}
                        />
                    </i>
                    {createField('Ввeдите пароль', 'password', [required, maxLength30], Input, visible ? "text" : "password")}</div>
                <div className={style.login_block}>
                    <i>
                        <img
                            src={repeateyes ? openEye : eye}
                            alt="eye"
                            onClick={activeRepeat}
                            className={style.passwordShown}
                        />
                    </i>
                    {createField('Повторите пароль', 'repeatPassword', [required, maxLength30], Input, repeatVisible ? "text" : "password")}
                </div>
                <div className={style.login_block}> <button className="button_submit">
                    Применить и войти
              </button></div>
                <span>
                    Уже зарегистрированы?
              <NavLink to="Login" className={style.button_a}>
                        Вход
              </NavLink>
                </span>
                {error && <div className={style.formSummaryError}>
                    {error}</div>}
            </form></div>
    </div>

}
export default reduxForm<RegistrValues>({ form: 'registration' })(RegistrationForm)