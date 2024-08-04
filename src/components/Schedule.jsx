import { PropTypes } from 'prop-types'

const Schedule = ({ selectedCourses }) => {

   



    return (

        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th scope="col" className="px-2">
                            Hora
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Lunes
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Martes
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Miercoles
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Jueves
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Viernes
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Sabado
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {
                        selectedCourses.map((hour, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="">
                                    {hour[0]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[1]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[2]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[3]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[4]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[5]}
                                </td>
                                <td className="px-6 py-2">
                                    {hour[6]}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

Schedule.propTypes = {
    selectedCourses: PropTypes.array.isRequired
}

export default Schedule