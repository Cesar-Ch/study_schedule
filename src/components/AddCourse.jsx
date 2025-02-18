import { useState } from "react"
import { PropTypes } from 'prop-types'
import IconX from "./IconX"

const AddCourse = ({ datos, setDatos }) => {


    const [cursos, setCursos] = useState([])

    const [horarios, setHorarios] = useState([{
        id: 1,
        day: 'Lunes',
        start: '',
        end: '',
    }])

    const guardarCurso = (e) => {
        e.preventDefault()

        if (e.nativeEvent.submitter.innerText.trim() === 'Guardar curso') {
            const name = e.target[0].value
            const teacher = e.target[1].value
            const section = e.target[2].value


            for (let i = 0; i < horarios.length; i++) {
                const horario = horarios[i]
                horario.day = e.target[i * 3 + 3].value
                horario.start = e.target[i * 3 + 4].value
                horario.end = e.target[i * 3 + 5].value
            }


            setDatos((prevdatos) => {
                const cursosActualizados = { ...prevdatos };

                if (!cursosActualizados[name]) {
                    cursosActualizados[name] = [
                        {
                            section,
                            teacher,
                            horario: [horarios],
                        },
                    ];
                } else {
                    cursosActualizados[name].push({
                        section,
                        teacher,
                        horario: [horarios],
                    });
                }

                return cursosActualizados;
            });

            setCursos((prevCursos) => {
                if (!prevCursos.some((curso) => curso === name)) {
                    return [...prevCursos, name];
                }
                return prevCursos;
            })
            setHorarios([
                {
                    id: 1,
                    day: 'Lunes',
                    start: '',
                    end: '',
                }
            ])
            e.target.reset()
        }
    }

    const agregarHorario = () => {
        setHorarios([...horarios, { id: Date.now().toString(), day: "Lunes", start: "", end: "" }])
    }

    const updateSchedule = (id, value, field) => {
        setHorarios((prevHorarios) => {
            const horariosActualizados = [...prevHorarios];
            const horarioIndex = horariosActualizados.findIndex((horario) => horario.id === id);
            horariosActualizados[horarioIndex][field] = value;
            return horariosActualizados;
        });

    }

    const deleteSchedule = (id) => {
        if (horarios.length > 1) {
            setHorarios(horarios.filter((horario) => horario.id !== id))
        }
    }

    console.log(horarios)
    console.log(cursos)
    console.log(datos)

    return (
        <div>
            <form onSubmit={guardarCurso}>
                <h2 className="text-2xl font-semibold mb-4">Agregar Curso</h2>
                <input list="teachers" type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del curso" required />
                <datalist id="teachers">
                    {
                        cursos.map((curso, i) => (
                            <option key={i} value={curso} ></option>
                        ))
                    }
                </datalist>

                <div className="mt-5 grid grid-cols-2 gap-4">
                    <input type="text" id="first_name" className="col-span-[span 3] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del profesor" required />

                    <input type="text" id="first_name" className="col-span-[50%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sección" required />
                </div>

                {
                    horarios.map((horario) => (
                        <div key={horario.id} className="relative py-4 pl-3 pr-10 border border-black/50 dark:border-white/50 rounded-lg mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 ">
                            <div className={`absolute top-2 right-2 ${horarios.length === 1 ? "pointer-events-none text-[#919192]" : ""}`}
                                onClick={() => deleteSchedule(horario.id)}>
                                <IconX />
                            </div>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-[#0f1118] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
                                onChange={(e) => updateSchedule(horario.id, e.target.value, 'day')} required>
                                <option selected value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                            </select>

                            <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark]" min="07:00" max="22:00" onChange={(e) => updateSchedule(horario.id, e.target.value, 'start')} required />
                            <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark]" min="07:00" max="22:00" onChange={(e) => updateSchedule(horario.id, e.target.value, 'end')} required />
                        </div>
                    ))
                }

                <div className="mt-5 flex justify-between items-center ">

                    <button type="button" className="text-black bg-white hover:bg-[#f1f5f9] border border-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:text-white dark:hover:bg-[#27272a] dark:border-white "
                        onClick={agregarHorario}>
                        Añadir otro horario
                    </button>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Guardar curso
                    </button>
                </div>
            </form>
        </div>
    )
}

AddCourse.propTypes = {
    datos: PropTypes.object.isRequired,
    setDatos: PropTypes.func.isRequired
}

export default AddCourse