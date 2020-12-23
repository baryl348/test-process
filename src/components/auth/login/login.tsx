import React, { useState } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../../common/formControls'
import { LoginValuesType } from '../../../container/login/login'
import { email, required } from '../../../utils/validators-type'
import proceset from "../../../img/Vector (1).png";
import style from './login.module.scss'
import { NavLink } from 'react-router-dom'
import eye from '../../../img/glaz.png'
import openEye from '../../../img/openEye.png'
import warning from '../../../img/warning.svg'



const LoginForm: React.FC<InjectedFormProps<LoginValuesType>> = ({ handleSubmit, error, pristine, submitting, ...props }) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [eyes, setEye] = useState<boolean>(false)
    const active = () => {
        setVisible(!visible)
        setEye(!eyes)
    }



    return <div className={style.wrapper}>  <div>
        <i className={style.item_processet}>
            <img src={proceset} alt="proceset" />
        </i>
    </div>  <div className={style.panel}>
            <form onSubmit={handleSubmit} className={style.login} >
                <div className={style.login_block}>{createField('Имя пользователя', 'email', [required, email], Input, 'text')}
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
                    {createField('Пароль', 'password', [required], Input, visible ? "text" : "password")}
                </div>
                <div className={style.login_block}><button className="button_submit" type='submit' disabled={pristine || submitting} >Войти в систему</button>
                </div>
                <div className={style.login_block}>
                    <NavLink
                        to="/Registration"
                        activeClassName={style.activeLink}
                        className={style.button_a}
                    >
                        Зарегистрироваться
                </NavLink>
                </div>
            </form>
            {error && <div className={style.formSummaryError}>
                <div><img src={warning} alt="warning" /></div>  {error}
            </div>}
        </div>  </div>
}
export default reduxForm<LoginValuesType>({ form: 'LoginForm' })(LoginForm)


