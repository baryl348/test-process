import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../../common/formControls'
import { RegistrValues } from '../../../container/registration/registration'
import { email, minLength, required } from '../../../utils/validators-type'
import style from '../login/login.module.scss'
import proceset from "../../../img/Vector (1).png";
import eye from '../../../img/glaz.png'
import openEye from '../../../img/openEye.png'
import warning from '../../../img/warning.svg'


type RegistrationValuesKeyType = Extract<keyof RegistrValues, string>

const RegistrationForm: React.FC<InjectedFormProps<RegistrValues>> = ({ handleSubmit, error, ...props }) => {
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

    return <div className={style.wrapper}>  <div>
        <i className={style.item_processet}>
            <img src={proceset} alt="proceset" />
        </i>
    </div>
        <div className={style.panel}>
            <div className={style.text}>
                <h1>Регистрация</h1>
            </div>
            <form onSubmit={handleSubmit} className={`${style.login} ${style.registration}`}>
                <div className={style.login_block}>
                    {createField<RegistrationValuesKeyType>('Имя', 'firstName', [required], Input, 'text')}
                </div>
                <div className={style.login_block}>
                    {createField<RegistrationValuesKeyType>('Фамилия', 'secondName', [required], Input, 'text')}
                </div>
                <div className={style.login_block}>
                    {createField<RegistrationValuesKeyType>('Электронная почта', 'email', [required, email], Input, 'text')}
                </div>
                <div className={style.login_block}>
                    <i>
                        <img
                            src={eyes ? openEye : eye}
                            alt="eye"
                            onClick={active}
                            className={style.passwordShown}
                        />
                    </i>
                    {createField<RegistrationValuesKeyType>('Ввeдите пароль', 'password', [required], Input, visible ? "text" : "password")}</div>
                <div className={style.login_block}>
                    <i>
                        <img
                            src={repeateyes ? openEye : eye}
                            alt="eye"
                            onClick={activeRepeat}
                            className={style.passwordShown}
                        />
                    </i>
                    {createField('Повторите пароль', 'repeatPassword', [required, minLength], Input, repeatVisible ? "text" : "password")}
                </div>
                <div className={style.login_block}> <button className="button_submit" type='submit' >
                    Применить и войти
              </button></div>
                <span>
                    Уже зарегистрированы?
              <NavLink to="Login" className={style.button_a}>
                        Вход
              </NavLink>
                </span>
            </form>
            {error && <div className={`${style.formSummaryError} ${style.formSummaryErrorRegistration}`}>
                <div><img src={warning} alt="warning" /></div> {error}
            </div>}
        </div>
    </div>

}
export default reduxForm<RegistrValues>({ form: 'Registration' })(RegistrationForm)