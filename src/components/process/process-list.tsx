import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './process.module.scss'
import clock from "../../img/Clock.png";
import closeClock from "../../img/hours have passed.png";
import loader from "../../img/loader.svg";
import human from "../../img/human.png";
import scense from "../../img/Scense.png";
import vector from "../../img/Vector (Stroke).png";
import "moment/locale/ru"
import moment from 'moment';
import 'moment-duration-format'

moment.locale('ru')

type PropsType = {
    id: number,
    name: string,
    numberOfExecutions: number,
    averageLeadTime: string
    averageActiveTime: string
    employeesInvolvedProcess: number,
    numberOfScenarios: number,
    start: string,
    end: string,
    loading: string
}

const ProcessList: React.FC<PropsType> = ({ id, name, numberOfExecutions, averageLeadTime, averageActiveTime,
    employeesInvolvedProcess, numberOfScenarios, start, end, loading }) => {

    function declOfNum(n: number, text_forms: Array<string>) {
        n = Math.abs(n) % 100; var n1 = n % 10;
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 == 1) { return text_forms[0]; }
        return text_forms[2];
    }
    const getPercent = (
        averageLead?: number | string,
        averageActive?: number | string
    ): string => {
        if (!averageLead || !averageActive) return "";

        return ` (${((+averageActive / +averageLead) * 100).toFixed(1)}%)`;
    };
    return (
        <div>
            <div className={style.panel}>
                <div className={style.name_panel}>
                    <span className={style.name_credit}>{name}</span>
                    <NavLink to="#?" className={style.name_process}>
                        На карту процесса
          <img src={vector} alt="vector" className={style.vector} />
                    </NavLink>
                </div>

                <hr />
                <div className={style.items}>
                    <div className={style.item_content_refresh}>
                        <i className={style.btn}>
                            <img src={loader} alt="loader" />
                        </i>
                        <div className={style.number}>{numberOfExecutions.toLocaleString()}</div>
                    </div>
                    <div className={style.item_time_credss}>выполнено раз</div>
                </div>

                <div className={style.items}>
                    <div className={style.item_content_time}>
                        <div className={style.clock}>
                            <i className={style.img_all}>
                                <img src={clock} alt="clock" />

                            </i>
                            {/* {`${moment.duration(averageLeadTime, "hours").format('h [ч]')} ${moment.duration(averageLeadTime, 'minutes').format('m [мин]')}`} */}
                            {/* ({(averageActiveTime/averageLeadTime*100).toFixed(1)}%) */}
                            {/* ({(+ parsedAverageLeadTime / + parsedAverageActiveTime * 100).toFixed(1)}%) */}
                            <span className={style.time}>{`${moment.duration(averageLeadTime).hours()}ч ${moment.duration(averageLeadTime).minutes()}мин`}</span>
                            <div className={style.item_time_cred}>среднее время выполнения</div>
                        </div>
                        <div className={style.close_clock}>
                            <i className={style.img_all}>
                                <img src={closeClock} alt="closeClock" />
                            </i>
                            <span className={style.time}>{`${moment.duration(averageActiveTime).hours()}ч ${moment.duration(averageActiveTime).minutes()}мин` + getPercent(averageLeadTime, averageActiveTime)}  </span>
                            <div className={style.item_time_cred}>среднее активное время</div>
                        </div>
                    </div>
                </div>

                <div className={style.items}>
                    <div className={style.item_content_time}>
                        <div>
                            <i className={style.img_all}>
                                <img src={human} alt="human" />
                            </i>
                            <span className={style.time}>{employeesInvolvedProcess}  {declOfNum(employeesInvolvedProcess, ["сотрудник", "сотрудника", "сотрудников"])}</span>
                            <div className={style.item_time_cred}>{declOfNum(employeesInvolvedProcess, ["участвует", "участвуют", "участвуют"])} в процессе</div>

                            <div>
                                <i className={style.img_all}>
                                    <img src={scense} alt="scense" />
                                </i>
                                <span className={style.time}>{numberOfScenarios} сценариев</span>
                                <div className={style.item_time_cred}>в процессе</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${style.items} ${style.item_end}`}>
                    <div className={style.item_content_time}>
                        <div className={style.dates}>
                            <div className={style.content_date} >
                                <span className={style.message_data}>Начало</span>
                                <span className={style.datas}>{moment(start, "X").format('LL')}</span>
                            </div>
                            <div className={style.content_date}>
                                <span className={style.message_data}>Окончание</span>
                                <span className={style.datas}>{moment(end, "X").format('LL')}</span>
                            </div>
                            <div className={style.content_date}>
                                <span className={style.message_data}>Загрузка</span>
                                <span className={style.datas}>{moment(loading, "X").format('LL')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProcessList