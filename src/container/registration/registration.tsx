import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import RegistrationForm from '../../components/auth/registration/registration'
import { AuthRegistr } from '../../redux/reducers/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { GetUser } from '../../redux/reducers/auth-reducer'
import { Preloader } from '../../common/preloader'

type MapStateType = {
    isAuth: boolean
    isLoading: boolean
}


type MapDispatchType = {
    AuthRegistr: (firstName: string, secondName: string, email: string, password: string) => void
    GetUser: () => void
}
export type RegistrValues = {
    firstName: string
    secondName: string
    email: string
    password: string
}

const Registration: React.FC<MapStateType & MapDispatchType> = (props) => {
    const onSubmit = (formData: RegistrValues) => {
        props.AuthRegistr(formData.firstName, formData.secondName, formData.email, formData.password)
    }
    // Редирект ток после перезагрузки страницы не знаю почему так
    useEffect(() => {
        props.GetUser()
    })

    if (props.isLoading) {
        return <Preloader />
    } else {
        if (props.isAuth) return <Redirect to={'/Profile'} />
    }
    return <div>  <RegistrationForm onSubmit={onSubmit} /> </div>
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { AuthRegistr, GetUser })(Registration)