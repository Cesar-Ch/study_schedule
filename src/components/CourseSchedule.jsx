import { PropTypes } from 'prop-types'

const CourseSchedule = ({ item, setSelectedCourses }) => {

    const addCourse = (e,sc) => {
        console.log(sc)
            sc.horario.map((schedule) => {
                const day = schedule.dia
                const hour = schedule.hora
                let indexDay
                let indexStartHour = hour.match(/\d+/gm)[0] - 7;
                let countHours = hour.match(/\d+/gm)[2] - hour.match(/\d+/gm)[0];
                console.log(indexStartHour, countHours)
                switch (day) {
                    case "LU":
                        indexDay = 1
                        break;
                    case "MA":
                        indexDay = 2
                        break;
                    case "MI":
                        indexDay = 3
                        break;
                    case "JU":
                        indexDay = 4
                        break;
                    case "VI":
                        indexDay = 5
                        break;
                    case "SA":
                        indexDay = 6
                        break;
                    default:
                        break;
                }
                if (e.target.checked) {
                    for (let i = 0; i < countHours; i++) {
                        setSelectedCourses((prevHours) => {
                            const updatedHours = [...prevHours];
                            updatedHours[indexStartHour + i][indexDay] = sc.seccion;
                            return updatedHours;
                        })
                    }
                } else {
                    for (let i = 0; i < countHours; i++) {
                        setSelectedCourses((prevHours) => {
                            const updatedHours = [...prevHours];
                            updatedHours[indexStartHour + i][indexDay] = "";
                            return updatedHours;
                        })
                    }
                }
                
                
            })

        
        
    }

    return (

            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="p-2">

                            </th>
                            <th scope="col" className="px-2 py-3">
                                Profesor
                            </th>
                            <th scope="col" className="px-2 py-3">
                                GRUPO
                            </th>
                            <th scope="col" className="px-2 py-3">
                                HORARIO
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            item.map((sc, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input 
                                            onClick={(e) => addCourse(e,sc)}
                                            id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {sc.profesor}
                                    </td>
                                    <td className="px-6 py-2">
                                        {sc.seccion}
                                    </td>
                                    <td className="px-6 py-2">
                                        {
                                            sc.horario.map((h, i) => (
                                                <div key={i}>
                                                    {h["dia"]}  - {h["hora"]}
                                                </div>
                                            ))
                                        }
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    )
}

CourseSchedule.propTypes = {
    item: PropTypes.array.isRequired,
    setSelectedCourses: PropTypes.func.isRequired,
}

export default CourseSchedule