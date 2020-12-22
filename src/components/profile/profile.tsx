import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input } from '../../common/formControls'
import { ProfileType } from '../../container/profile/profile'
import { Header } from '../header/header'
import style from './profile.module.scss'
import { required } from '../../utils/validators-type'


type ownProps = {
    secondName: string | null
    firstName: string | null
}

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
                                        {/* //TODO рефакторить начиная от этого field */}
                                        <label>Имя</label>
                                        {createField('Не задано', 'firstName', [], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Фамилия</label>
                                        {createField('Не задано', 'secondName', [], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Электронная почта</label>
                                        {createField('Не задано', 'email', [], Input, 'text')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label>Новый пароль</label>
                                        {createField('Не задано', 'password', [], Input, 'password')}
                                    </div>
                                    <div className={style.login_block}>
                                        <label className={style.panel_text}>Повторите пароль</label>
                                        {createField('Не задано', 'newPassword', [], Input, 'password')}
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