import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProfileForm from '../../components/profile/profile'
import { AppStateType } from '../../redux/redux-store';
import { EditUser, GetUser } from "../../redux/reducers/auth-reducer";
import { Redirect } from 'react-router-dom';




export type ProfileType = {
    firstName: string
    secondName: string
    email: string
    password: string
}
type StateProps = {
    firstName: string | null
    secondName: string | null
    id: number | null
    isAuth: boolean
    isLoading: boolean
}

type DispatchType = {
    EditUser: (id: any, firstName: string, secondName: string, email: string, password: string) => void
    GetUser: () => void
}


const Profile: React.FC<StateProps & DispatchType> = (props) => {

    useEffect(() => {
        props.GetUser()
    })
    if (!props.isAuth) return <Redirect to={'/Login'} />
    const onSubmit = (formData: ProfileType) => {
        props.EditUser(props.id, formData.firstName, formData.secondName, formData.email, formData.password)
    }

    return <div>  <ProfileForm onSubmit={onSubmit} firstName={props.firstName} secondName={props.secondName} /> </div>
}

const MapStateToProps = (state: AppStateType) => ({
    firstName: state.auth.firstName,
    secondName: state.auth.secondName,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading
})

export default connect(MapStateToProps, { EditUser, GetUser })(Profile)