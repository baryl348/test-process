import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import RegistrationForm from '../../components/auth/registration/registration'
import { AuthRegistr } from '../../redux/reducers/auth-reducer'
import { AppStateType } from '../../redux/redux-store'

type MapStateType = {
    isAuth: boolean
}

type MapDispatchType = {
    AuthRegistr: (firstName: string, secondName: string, email: string, password: string) => void
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
    if (props.isAuth) return <Redirect to={'/Profile'} />
    return <div>  <RegistrationForm onSubmit={onSubmit} /> </div>
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { AuthRegistr })(Registration)