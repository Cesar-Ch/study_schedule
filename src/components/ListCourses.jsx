import { useState } from "react";
import { PropTypes } from 'prop-types'
import { IconX, UsatLogo } from "./Icons";

const ListCourses = ({ datos, setDatos, selectedCourse, setSelectedCourse, setShowToast, setMessage, showAcdCourses, setShowAcdCourses, setTypeToast }) => {
    const [openSection, setOpenSection] = useState(null);


    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const deleteCourse = (e, curso, j) => {

        // saber el input al que esta asociado el boton
        const input = e.target.closest(".relative").querySelector("input[type='radio']")
        console.log(input)

        if (input.checked) {
            setSelectedCourse((prevSelectedCourse) => {
                const selectedCourseCopy = { ...prevSelectedCourse }
                delete selectedCourseCopy[curso]
                return selectedCourseCopy
            })
        }
        setDatos((prevdatos) => {
            const cursosActualizados = { ...prevdatos };
            cursosActualizados[curso].splice(j, 1)
            if (cursosActualizados[curso].length === 0) {
                delete cursosActualizados[curso]
            }
            return cursosActualizados;
        });
    }

    const checkCross = (e, curso, dato) => {
        const selectedCourseKeys = Object.keys(selectedCourse)
        const seletedCourseValues = Object.values(selectedCourse)
        let cruce = false
        for (let i = 0; i < selectedCourseKeys.length; i++) {
            const horario = seletedCourseValues[i].horario[0]
            const horarioDato = dato.horario[0]

            if (selectedCourseKeys[i] === curso) continue

            for (let j = 0; j < horario.length; j++) {
                for (let k = 0; k < horarioDato.length; k++) {
                    if (horario[j].day === horarioDato[k].day) {
                        const [hourStart, minuteStart] = horario[j].start.split(":")
                        const [hourEnd, minuteEnd] = horario[j].end.split(":")
                        const [hourStartDato, minuteStartDato] = horarioDato[k].start.split(":")
                        const [hourEndDato, minuteEndDato] = horarioDato[k].end.split(":")

                        const start = new Date(0, 0, 0, hourStart, minuteStart).getTime()
                        const end = new Date(0, 0, 0, hourEnd, minuteEnd).getTime()
                        const startDato = new Date(0, 0, 0, hourStartDato, minuteStartDato).getTime()
                        const endDato = new Date(0, 0, 0, hourEndDato, minuteEndDato).getTime()

                        if ((startDato >= start && startDato < end) || (endDato > start && endDato <= end) || (startDato <= start && endDato >= end)) {
                            cruce = true
                            break
                        }
                    }
                }
            }
        }

        if (cruce) {
            setShowToast(true)
            setMessage('Cruce de horarios')
            setTypeToast('error')
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
            e.target.checked = false
            return
        }

        setSelectedCourse((prevSelectedCourse) => {
            return {
                ...prevSelectedCourse,
                [curso]: dato
            }

        })
    }

    const editSelectedCourse = (e, curso, dato) => {

        e.target.checked = !e.target.checked
        if (e.target.checked) {
            checkCross(e, curso, dato)
        } else {
            setSelectedCourse((prevSelectedCourse) => {
                const selectedCourseCopy = { ...prevSelectedCourse }
                delete selectedCourseCopy[curso]
                return selectedCourseCopy
            })
        }
    }

    return (
        <section className="mt-6 section-custom">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold  ">Lista de cursos</h2>
                <div className="dark:hover:bg-[#3c3c3f] px-1 rounded-lg hover:bg-gray-100" onClick={() => setShowAcdCourses(!showAcdCourses)}>
                    <UsatLogo />
                </div>
            </div>

            {
                Object.keys(datos).map((curso, i) => (
                    <div key={curso}>
                        <h2 id={`accordion-collapse-heading-${i}`}>
                            <button
                                type="button"
                                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border  border-gray-200   dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#27272a] gap-3 ${openSection === i ? "bg-gray-100 dark:bg-[#27272a]" : ""
                                    }`}
                                onClick={() => toggleSection(i)}
                            >
                                <span>{curso}</span>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transform ${openSection === i ? "rotate-180" : ""
                                        } shrink-0`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </button>
                        </h2>
                        {
                            datos[curso].map((dato, j) => (

                                <div key={`${curso}-${j}`}
                                    id={`accordion-collapse-body-${i}`}
                                    className={`relative ${openSection === i ? "flex" : "hidden"} p-5 dark:bg-[#0e0e11] border  border-gray-200 dark:border-gray-700 items-center`}
                                >
                                    <div className="absolute right-3" onClick={(e) => deleteCourse(e, curso, j)}>
                                        <IconX />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <input id={`schedule-${i}-${j}`} type="radio" value="" name={`course-${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={(e) => editSelectedCourse(e, curso, dato)} onClick={(e) => editSelectedCourse(e, curso, dato)} />
                                        <label htmlFor={`schedule-${i}-${j}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{dato.teacher} ({dato.section})
                                            <div className="flex items-center gap-2">
                                                {
                                                    dato.horario[0].map((horario, k) => (
                                                        <span key={`${curso}-${j}-${k}`} className="text-gray-500 dark:text-gray-400">{horario.day} {horario.start} - {horario.end}</span>
                                                    ))
                                                }
                                            </div>
                                        </label>
                                    </div>

                                </div>
                            ))}
                    </div>
                ))}

        </section>
    );
};

ListCourses.propTypes = {
    datos: PropTypes.object.isRequired,
    setDatos: PropTypes.func.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    setSelectedCourse: PropTypes.func.isRequired,
    setShowToast: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    showAcdCourses: PropTypes.bool.isRequired,
    setShowAcdCourses: PropTypes.func.isRequired
}

export default ListCourses;
