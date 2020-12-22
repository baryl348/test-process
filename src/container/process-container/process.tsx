import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Header } from '../../components/header/header'
import style from '../../components/process/process.module.scss'
import ProcessList from '../../components/process/process-list'
import { AppStateType } from '../../redux/redux-store'
import { ProcessType } from '../../redux/reducers/process-reducer'
import { GetProcess } from '../../redux/reducers/process-reducer'
import { Redirect } from 'react-router-dom'
import { GetUser } from '../../redux/reducers/auth-reducer'

type MapStateType = {
    process: Array<ProcessType>
    isAuth: boolean
}
// TODO зафиксить типы any
type MapDispatchType = {
    GetProcess: () => any
    GetUser: () => void
}
// TODO fixed any type

const Process: React.FC<MapStateType & MapDispatchType> = (props) => {

    const [process, setProcess] = useState(null)
    if (process == null) {
        setProcess(props.GetProcess())
    }

    const Component = props.process.map((item) => <ProcessList id={item.id} name={item.name} numberOfExecutions={item.numberOfExecutions}
        averageLeadTime={item.averageLeadTime} averageActiveTime={item.averageActiveTime}
        employeesInvolvedProcess={item.employeesInvolvedProcess} numberOfScenarios={item.numberOfScenarios}
        start={item.start} end={item.end} loading={item.loading} key={item.id} />
    )
    props.GetUser()
    if (!props.isAuth) return <Redirect to={'/Login'} />
    return (
        <div>
            <Header />
            <div className={style.back} >
                {Component}
            </div>
        </div>

    )


}
const MapStateToProps = (state: AppStateType) => ({
    process: state.process.process,
    isAuth: state.auth.isAuth
})
export default connect(MapStateToProps, { GetProcess, GetUser })(Process)