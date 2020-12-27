import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../common/formControls'
import { ProfileType } from '../../container/profile/profile'
import { match, minLength, required } from '../../utils/validators-type'
import { Header } from '../header/header'
import style from './profile.module.scss'


type ownProps = {
    secondName: string | null
    firstName: string | null
}
type ProfileValuesKeyType = Extract<keyof ProfileType, string>

const ProfileForm: React.FC<InjectedFormProps<ProfileType, ownProps> & ownProps> = ({ handleSubmit, firstName, secondName, error, ...props }) => {
    return (
        <div><Header />
            <div className={style.wrapper}>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <h1>
                                        {`${firstName} ${secondName}`}. Редактирование
                                </h1>
                                </div>
                            </div>
                            <div className={style.panel}>
                                <form
                                    onSubmit={handleSubmit}>
                                    <div className={style.login_block}>
                                        <label>Имя</label>
                                        {createField<ProfileValuesKeyType>('Не задано', 'firstName', [required], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Фамилия</label>
                                        {createField<ProfileValuesKeyType>('Не задано', 'secondName', [required], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Электронная почта</label>
                                        {createField<ProfileValuesKeyType>('Не задано', 'email', [required], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Новый пароль</label>
                                        {createField<ProfileValuesKeyType>('Не задано', 'password', [minLength], Input, 'password')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label className={style.panel_text}>Повторите пароль</label>
                                        {createField('Не задано', 'repeatPassword', [minLength, match('password')], Input, 'password')}
                                    </div>
                                    <div className={style.button_save}>
                                        <button type="submit" className="button_submit" >
                                            Сохранить
                                    </button>
                                    </div>
                                    {error && <div className={style.formSummaryError}>
                                        {error}
                                    </div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default reduxForm<ProfileType, ownProps>({ form: 'ProfileForm' })(ProfileForm)