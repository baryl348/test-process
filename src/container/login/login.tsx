import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Preloader } from '../../common/preloader';
import LoginForm from '../../components/auth/login/login'
import { AuthLogin, GetUser } from '../../redux/reducers/auth-reducer'
import { AppStateType } from "../../redux/redux-store";



export type LoginValuesType = {
    email: string
    password: string

}
type mapDispatch = {
    AuthLogin: (email: string, password: string) => void
    GetUser: () => void
}

type StatePropsType = {
    isAuth: boolean
    isLoading: boolean
}


const Login: React.FC<StatePropsType & mapDispatch> = (props) => {
    const onSubmit = (formData: LoginValuesType) => {
        props.AuthLogin(formData.email, formData.password)
    }
    useEffect(() => {
        props.GetUser()
    })
    if (props.isLoading) {
        return <Preloader />
    } else {
        if (props.isAuth) return <Redirect to={'/Profile'} />
    }
    return <div> <LoginForm onSubmit={onSubmit} />  </div>
}

const MapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
})

export default connect(MapStateToProps, { AuthLogin, GetUser })(Login) 