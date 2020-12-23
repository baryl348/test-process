
import { AppStateType, InferActionsType } from "../redux-store"
import {ThunkAction} from "redux-thunk";
import {ProcessApi} from "../../api/api";



export type ProcessType = {
    id: number 
    name: string 
    numberOfExecutions: number 
    averageLeadTime: string 
    averageActiveTime:  string 
    employeesInvolvedProcess: number 
    numberOfScenarios: number 
    start: string 
    end: string 
    loading: string 
}

const initialState = {
    process: []as Array <ProcessType>,
    isLoading:true as boolean
}
    type ActionTypes = InferActionsType<typeof actions>
const procesReducer = (state=initialState,action:ActionTypes) =>{
        switch (action.type) {
            case 'SET_PROCESS_LIST':
                return{
                    ...state,
                    process:[...action.payload]
                }
               
            default:
                return state
        }
}
export const actions ={
        setProcess : (process:[]) =>({
            type:'SET_PROCESS_LIST',
            payload:process
        })
    }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
    export  const GetProcess = ():ThunkType => async (dispatch) =>{
    const ProcessData = await ProcessApi.getProcess()
        if(ProcessData){
            dispatch(actions.setProcess(ProcessData.data.processList))
        }
    }

    export default procesReducer
