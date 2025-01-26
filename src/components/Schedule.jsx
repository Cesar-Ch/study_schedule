import { PropTypes } from 'prop-types'
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes","Sábado"]
const horas = Array.from({ length: 16 }, (_, i) => i + 7)



const Schedule = ({selectedCourse, setSelectedCourse}) => {

    const downloadCap = (e) => {
        e.preventDefault()
        const table = document.querySelector('table')
        import('https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/+esm')
        .then(({ default: html2canvas }) => {
            html2canvas(table).then((canvas) => {
                const link = document.createElement('a')
                link.download = 'horario.png'
                link.href = canvas.toDataURL()
                link.click()
            })

        })
    }

    return (
        <div className="overflow-x-auto flex flex-col justify-center items-center">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] font-bold dark:bg-[#27272a] dark:text-[#a1a1aa]">Hora</th>
                        {dias.map((dia) => (
                            <th key={dia} className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] font-bold dark:bg-[#27272a] dark:text-[#a1a1aa]">
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {horas.map((hora) => (
                        <tr key={hora}>
                            <td className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] dark:bg-[#27272a] dark:text-[#a1a1aa]">{`${hora}:00`}</td>
                            {
                                dias.map((dia) => (
                                    <td key={`${dia}-${hora}`} className="border border-[#64748b]/20 dark:border-[#a1a1aa]/20 p-2">
                                        {
                                            Object.values(selectedCourse).map((curso,i) => {
                                                
                                                return curso.horario[0].map((horario, j) => {
                                                    if (horario.day === dia && parseInt(horario.start.split(":")[0]) <= hora && parseInt(horario.end.split(":")[0]) > hora) {
                                                        return (
                                                            <div key={`${i}-${j}`} className="p-1 rounded text-[10px] text-white bg-blue-700 dark:bg-blue-600">
                                                                <p className="font-bold">{Object.keys(selectedCourse)[i]} - {curso.section}</p>
                                                                <p className="">{curso.teacher}</p>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            })
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 mt-5" onClick={(e)=> downloadCap(e)}
                    >
                        Guardar Horario
                    </button>
            </div>
        </div>
    )
}

Schedule.propTypes = {
    selectedCourse: PropTypes.object.isRequired,
    setSelectedCourse: PropTypes.func.isRequired
}

export default Schedule