import { useState } from "react"
import { Accordion, GraduationCap, IconX, Trash, UsatLogo } from "./Icons"
import { CoursesModal } from "./CoursesModal"
import { useCourses } from "../context/CoursesContext"
import { Button } from "./Button"
import { useToast } from "../context/ToastContext"



export const ListCourses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [expandedCourses, setExpandedCourses] = useState({})
    const { selectedCourses, removeCourse, selectedSchedule, addSchedule,removeAllSchedulesFromCourse } = useCourses()
    const {showToast} = useToast()

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            [courseId]: !prev[courseId]
        }))
    }

    const checkScheduleConflict = (newSchedule) => {
        const scheduleId = `${newSchedule.carreraId}-schedule-${newSchedule.nombre}-${newSchedule.ciclo}`
        const isAlreadySelected = selectedSchedule.some(sch => sch.id === scheduleId && sch.schedule.section === newSchedule.schedule.section)

        if (isAlreadySelected) {
            return false
        }

        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number)
            return hours * 60 + minutes
        }

        for (const existingSchedule of selectedSchedule) {
            if (existingSchedule.nombre === newSchedule.nombre) continue

            for (const newHorario of newSchedule.schedule.horario) {
                for (const existingHorario of existingSchedule.schedule.horario) {
                    if (newHorario.day === existingHorario.day) {
                        const newStart = timeToMinutes(newHorario.start)
                        const newEnd = timeToMinutes(newHorario.end)
                        const existingStart = timeToMinutes(existingHorario.start)
                        const existingEnd = timeToMinutes(existingHorario.end)

                        const hasConflict = (
                            (newStart >= existingStart && newStart < existingEnd) ||
                            (newEnd > existingStart && newEnd <= existingEnd) ||
                            (newStart <= existingStart && newEnd >= existingEnd)
                        )

                        if (hasConflict) {
                            showToast(
                                "¡Conflicto de horario!",
                                "error"
                            )
                            return true
                        }
                    }
                }
            }
        }

        return false
    }


    const handleAddSchedule = (course, schedule) => {
        const scheduleId = `${course.carreraId}-schedule-${course.nombre}-${course.ciclo}`

        const newSchedule = {
            id: scheduleId,
            nombre: course.nombre,
            schedule: schedule,
            carrera: course.carrera,
            carreraId: course.carreraId,
            ciclo: course.ciclo,
        }

        if (checkScheduleConflict(newSchedule)) {
            removeAllSchedulesFromCourse(course.nombre)
            return
        }

        addSchedule(newSchedule)
    }

    console.log(selectedSchedule)
    return (
        <section className=" card p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white ">Lista de cursos</h2>
                <Button className="border text-black font-medium dark:text-white dark:bg-transparent hover:bg-light-pri/50 hover:cursor-pointer dark:hover:bg-dark-pri" onClick={() => setIsModalOpen(true)}>
                    <GraduationCap className="size-4" />
                    <p >
                        Cursos USAT
                    </p>
                </Button>

            </div>
            <div className="space-y-3">
                {selectedCourses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No hay cursos seleccionados
                    </p>) : (

                    selectedCourses.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col justify-between items-center  dark:bg-bg-card rounded-lg border-[#444] border"
                        >
                            <div className="w-full flex justify-between items-center p-3  transition" onClick={() => toggleCourse(course.id)}>
                                <div
                                    className="flex-1 cursor-pointer"

                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`transform transition-transform ${expandedCourses[course.id] ? 'rotate-180' : ''}`}>
                                            <Accordion className="size-2.5 text-black dark:text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xs text-black dark:text-white">
                                                {course.nombre}
                                            </h3>

                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeCourse(course.id)}
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-400/20 rounded transition text-zinc-500 dark:text-zinc-400"
                                    title="Eliminar curso"
                                >
                                    <Trash />
                                </button>
                            </div>

                            {/* Secciones expandibles */}
                            {expandedCourses[course.id] && course.sections && (
                                <div className="w-full border-t border-[#444] bg-bg-app rounded-lg">
                                    {course.sections.map((section, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border-b last:border-b-0 border-[#444]
                                            transition-all flex justify-start items-center gap-4"

                                        >
                                            <input type="checkbox" className="size-3 rounded-full appearance-none border-2 border-gray-400 
                           checked:bg-brand checked:border-brand-hover" name={course.nombre} id={`${course.nombre}-section-${index}`}
                                                checked={selectedSchedule.some(sch => sch.id === `${course.carreraId}-schedule-${course.nombre}-${course.ciclo}` && sch.schedule.section === section.section)}
                                                onChange={() => {
                                                    handleAddSchedule(course, section)
                                                }}
                                            />
                                            <label htmlFor={`${course.nombre}-section-${index}`} className="flex flex-col gap-1">
                                                <div className="flex justify-between items-start ">
                                                    <div >
                                                        <p className="font-semibold text-xs text-black dark:text-white mb-1">
                                                            Sección {section.section || index + 1}
                                                        </p>
                                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                            {section.teacher || 'Docente no asignado'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Horarios */}
                                                {section.horario && section.horario.length > 0 && (
                                                    <div className=" space-y-1">
                                                        {section.horario.map((horario) => (
                                                            <div
                                                                key={horario.id}
                                                                className="text-[10px]  flex gap-2 justify-start items-center text-zinc-500 dark:text-zinc-400"
                                                            >
                                                                <span className="w-1 h-1  rounded-full bg-zinc-500"></span>
                                                                <span className="flex items-center gap-1">{horario.day.slice(0, 3)}:</span>
                                                                <span>
                                                                    {horario.start} - {horario.end}
                                                                </span>

                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>


            <CoursesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>

    )
}
