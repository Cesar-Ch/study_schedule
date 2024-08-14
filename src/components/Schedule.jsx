import { PropTypes } from 'prop-types'

const Schedule = ({ selectedCourses }) => {

    return (

        <div className="w-full relative">
            <table className="w-full text-sm text-left  text-gray-500 dark:text-white table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-main-700 dark:text-secondary">
                    <tr>
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
                            <tr key={index} className="bg-white border dark:bg-[#18181b] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#393941]">
                                <td className="">
                                    {hour[0]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
                                    {hour[1]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
                                    {hour[2]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
                                    {hour[3]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
                                    {hour[4]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
                                    {hour[5]}
                                </td>
                                <td className="px-6 py-2 text-ellipsis contain-inline-size overflow-hidden ">
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