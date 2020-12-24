import axios from 'axios'

const instance = axios.create({
    baseURL: `http://localhost:4000/api`,
    headers: {
        "Authorization": "bearer "+ window.localStorage.getItem("token"),  
        "Content-Type": "application/json",
        "Accepts":"application/json"
      },

      
})
const instanceNotAuth = axios.create({
  baseURL: `http://localhost:4000/api`,
  headers: { 
      "Content-Type": "application/json"
    }
    
})


export const auth = {
    async login(email:string,password:string){
      const res = await instanceNotAuth.post<ResponseType<LoginType>>(``, { query: `mutation{login(email:"${email}",password:"${password}"){token, user{id, firstName, secondName, email}}}` })
    return res.data
    },
    async registration(firstName:string,secondName:string,email:string,password:string){
      const res = await instanceNotAuth.post<ResponseType<RegistrationType>>(``,{query:`mutation{signup(firstName:"${firstName}",secondName:"${secondName}",email:"${email}",password:"${password}")}`})
      return res.data
    },
    async me (){
      const res = await instance.post<ResponseType<MeType>>(``,{query:`query{currentUser{id,firstName,secondName,email}}`})
      return res.data
    }
}

export const ProcessApi ={
    async getProcess(){
        const res = await instance.post(``,{query:`query{processList{id,name,numberOfExecutions,averageLeadTime,averageActiveTime,employeesInvolvedProcess,numberOfScenarios,start,end,loading}}`})
    return res.data
    }
}

export const EditProfile = {
    async editMe(id:number,firstName:string,secondName:string,email:string,password:string){
        const res = await  instance.post<ResponseType<ProfileEditType>> (``,{query:`mutation{editUser(id:${id},firstName:"${firstName}",secondName:"${secondName}",email:"${email}",password:"${password}"){id, firstName, secondName, email}}`})
    return res.data
    }
}



type ResponseType<D> = {
  data: D
  errors:[{
    message:string
    statusCode:number
  }]
}

type LoginType = {
    login:{
    token:string
    user:{
      id:number
      firstName:string
      secondName:string
      email:string
    }
  }
}

type RegistrationType = {
  signup:string
}

type MeType = {
  currentUser:{
    id:number
    firstName:string
    secondName:string
    email:string
  }
}

type ProfileEditType = {
  editUser:{
    id:number
    firstName:string
    secondName:string
    email:string
    password:string
    user:{
      id:number
    firstName:string
    secondName:string
    email:string
    }
  }
}



