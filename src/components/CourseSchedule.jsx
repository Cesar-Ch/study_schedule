import { PropTypes } from 'prop-types'

const CourseSchedule = ({ item, selectedCourses, setSelectedCourses, courseName }) => {
    const addCourse = (e, sc) => {
        let newInfo = []
        let grupoValido = true
        sc.horario.map((schedule) => {
            console.log(item)
            const day = schedule.dia
            const hour = schedule.hora
            let indexDay
            let indexStartHour = hour.match(/\d+/gm)[0] - 7;
            let countHours = hour.match(/\d+/gm)[2] - hour.match(/\d+/gm)[0];
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
            for (let i = 0; i < countHours; i++) {
                newInfo.push([indexDay, indexStartHour + i])
                if (selectedCourses[indexStartHour + i][indexDay] !== "") {
                    grupoValido = false
                }
            }
        })
        
        if (e.target.checked) {
            if (grupoValido) {
                for (let i = 0; i < newInfo.length; i++) {
                    const updatedCourses = [...selectedCourses]
                    updatedCourses[newInfo[i][1]][newInfo[i][0]] =  `[${sc.seccion}]`+courseName
                    setSelectedCourses(updatedCourses)
                }
            } else {
                e.target.checked = false
                alert("Horario no disponible")
            }
        } else {
            for (let i = 0; i < newInfo.length; i++) {
                const updatedCourses = [...selectedCourses]
                updatedCourses[newInfo[i][1]][newInfo[i][0]] = ""
                setSelectedCourses(updatedCourses)
            }
        }

    }

    return (

        <div className="w-full relative overflow-x-auto shadow-md shadow-gray-300 dark:shadow-gray-700 dark:shadow-sm sm:rounded-lg">
            <details className=' flex items-center justify-between w-full p-5 font-medium  text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#393941] gap-3'>
                <summary>{courseName}</summary>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#4c4d58] dark:text-white">
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
                                <tr key={index} className="bg-white border dark:bg-[#18181b] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#18181b]/30">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                onClick={(e) => addCourse(e, sc)}
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
            </details>
        </div>
    )
}

CourseSchedule.propTypes = {
    item: PropTypes.array.isRequired,
    setSelectedCourses: PropTypes.func.isRequired,
    selectedCourses: PropTypes.array.isRequired,
    courseName: PropTypes.string.isRequired
}

export default CourseSchedule