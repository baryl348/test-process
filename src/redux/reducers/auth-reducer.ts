import { BaseThunk } from './../redux-store';
import {  stopSubmit } from "redux-form"
import {auth, EditProfile} from "../../api/api"
import {  InferActionsType } from "../redux-store"



const initialState = {
    id:null as number | null,
    email: null as string | null,
    firstName:null as string |null,
    secondName:null as string | null,
    isAuth:false as boolean,
    isLoading:true as boolean
}
type ActionTypes = InferActionsType<typeof actions>
const authReducer = (state=initialState,action:ActionTypes)=>{
switch(action.type){
    case 'SET_LOADING':
case  'SET_USER_DATA':return{
    ...state,
    ...action.payload
}
default:
return state
}
 
}

export const actions = {
     setUserData : (id:number, firstName:string, secondName:string, email:string, isAuth:boolean) => ({
        type: 'SET_USER_DATA',
       payload:{id, firstName, secondName, email, isAuth}
    } as const),
    setLoading:(isLoading:boolean) =>({
       type:'SET_LOADING',
       payload:{isLoading}
    } as const)

}

type ThunkType = BaseThunk<ActionTypes | ReturnType<typeof stopSubmit>>

export const GetUser = ():ThunkType =>async(dispatch) =>{
    try{
        const UserData = await auth.me()
        if (UserData){
        const {id,firstName,secondName,email} = UserData.data.currentUser
        dispatch(actions.setUserData(id,firstName,secondName,email, true))
    }}catch(error){
        console.log(error)
    }finally{
        dispatch(actions.setLoading(false))
    }
}


export const AuthLogin =  (email:string,password:string):ThunkType => async(dispatch) => {
    const loginData = await auth.login(email,password)
        try{
            const {id, firstName, secondName, email} = loginData.data.login.user
         dispatch(actions.setUserData(id,firstName,secondName,email,true))
            const token = loginData.data.login.token
            window.localStorage.setItem('token',token)
        }catch(error){
            const message = loginData.errors.length > 0 ?  loginData.errors[0].message  : "Неизвестная ошибка";
         dispatch(stopSubmit("LoginForm",{_error:message}))
        }
    } 


export const EditUser = (id:number ,firstName:string,secondName:string,email:string,password:string):ThunkType => async (dispatch) =>{
    const UserData = await EditProfile.editMe(id,firstName,secondName,email,password)
    try{
        const {id, firstName, secondName, email}=UserData.data.editUser
        dispatch(actions.setUserData(id,firstName,secondName,email,true))
        // or used dispatch
        // dispatch(GetUser())
    }catch(error){
        const message = UserData.errors.length > 0 ?  UserData.errors[0].message  : "Неизвестная ошибка";
         dispatch(stopSubmit("LoginForm",{_error:message}))
    }
}

    export const AuthRegistr =  (firstName:string,secondName:string,email:string,password:string):ThunkType => async (dispatch)=>{
        const registerData = await auth.registration(firstName,secondName,email,password)
            const token = registerData.data.signup
            if(token == null){
                const message = registerData.errors.length > 0 ? registerData.errors[0].message : 'Неизвестная ошибка'
              dispatch(stopSubmit('Registration',{_error:message}))
            }else{
                window.localStorage.setItem('token',token)
                window.location.reload()
            }
        }


export default authReducer