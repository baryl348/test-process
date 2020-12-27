
import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import {  reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import authReducer from "./reducers/auth-reducer";
import procesReducer from "./reducers/process-reducer";


const rootReducer = combineReducers({
    form:formReducer,
    auth:authReducer,
    process:procesReducer,

})

type PropertiesType<GenericType> = GenericType extends {[key:string]: infer U} ? U :never
export type InferActionsType<GenericType extends {[key:string]: (...args:any[])=>any}> = ReturnType <PropertiesType<GenericType>>
type RootReducer = typeof rootReducer
export type AppStateType = ReturnType<RootReducer>
export type BaseThunk<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A>

//@ts-ignore
// window.__store__ = store;

//@ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
    applyMiddleware(thunkMiddleware)
)
export default store