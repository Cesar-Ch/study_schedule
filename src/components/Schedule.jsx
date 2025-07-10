import { PropTypes } from 'prop-types'
import Button from './Button'
import { Calendar } from './Icons'
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const horas = Array.from({ length: 16 }, (_, i) => `${i + 7}:00 - ${i + 8}:00`)



const Schedule = ({ selectedCourse }) => {

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
    console.log()
    return (
        <div>
            <section className='section-custom'>
                {

                    Object.keys(selectedCourse).length > 0 ?
                        (<div className="overflow-x-auto w-full flex  flex-col justify-center items-start relative">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#314257] font-bold dark:bg-[#0f1117] dark:text-[#a1a1aa]">Hora</th>
                                        {dias.map((dia) => (
                                            <th key={dia} className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#314257] font-bold dark:bg-[#0f1117] dark:text-[#a1a1aa]">
                                                {dia}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {horas.map((hora) => (
                                        <tr key={hora}>
                                            <td className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#314257] dark:bg-[#0f1117] dark:text-[#a1a1aa] text-center min-w-[150px]">{`${hora}`}</td>
                                            {
                                                dias.map((dia) => (
                                                    <td key={`${dia}-${hora}`} className="border border-[#64748b]/20 dark:border-[#a1a1aa]/20 p-2 dark:bg-[#0f1117]">
                                                        {
                                                            Object.values(selectedCourse).map((curso, i) => {

                                                                return curso.horario[0].map((horario, j) => {
                                                                    let [hourStart, minuteStart] = horario.start.split(":")
                                                                    let [hourEnd, minuteEnd] = horario.end.split(":")
                                                                    let [currentHourStart, currentMinuteStart] = hora.split("-")[0].split(":")
                                                                    let [currentHourEnd, currentMinuteEnd] = hora.split("-")[1].split(":")
                                                                    let start = new Date(0, 0, 0, hourStart, minuteStart).getTime()
                                                                    let end = new Date(0, 0, 0, hourEnd, minuteEnd).getTime()
                                                                    let currentStart = new Date(0, 0, 0, currentHourStart, currentMinuteStart).getTime()
                                                                    let currentEnd = new Date(0, 0, 0, currentHourEnd, currentMinuteEnd).getTime()

                                                                    if (horario.day === dia && ((currentStart >= start && currentEnd <= end) || (currentStart <= start && currentEnd >= end) || (currentStart <= start && currentEnd > start) || (currentStart < end && currentEnd >= end))) {
                                                                        return (
                                                                            <div key={`${i}-${j}`} className="p-1 rounded text-[10px] text-white bg-blue-700 dark:bg-blue-600 max-w-[120px] h-full overflow-hidden">
                                                                                <p className="font-bold text-nowrap   overflow-hidden overflow-ellipsis">{Object.keys(selectedCourse)[i]} ({curso.section})  </p>

                                                                                <p className=" overflow-hidden overflow-ellipsis text-nowrap">{curso.teacher}</p>
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
                            <Button className="mt-5" onClick={downloadCap}>Descargar horario</Button>
                        </div>) : (
                            <div className='flex flex-col items-center text-gray-600 dark:text-gray-400 p-8 gap-4'>
                                <Calendar size={50} />
                                <h3 className='text-gray-400 dark:text-gray-200 text-lg font-medium'>Tu horario esta vacío</h3>
                                <p className='text-gray-500 text-sm dark:text-gray-300'>Selecciona los cursos para ver tu horario</p>
                            </div>
                        )
                }
            </section>
        </div>
    )
}

Schedule.propTypes = {
    selectedCourse: PropTypes.object.isRequired,
    setSelectedCourse: PropTypes.func.isRequired
}

export default Schedule