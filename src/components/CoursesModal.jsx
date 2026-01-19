import { useRef, useEffect, useState } from 'react'
import { IconX, Plus } from "./Icons"
import { createPortal } from "react-dom"
import { useCoursesData } from '../hooks/useCoursesData'

export const CoursesModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null)

    const { coursesData, isLoading, error } = useCoursesData()
    const [selectedCareer, setSelectedCareer] = useState("")
    const [selectedCycle, setSelectedCycle] = useState("")

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    if (!isOpen) return null

    const careers = coursesData ? Object.entries(coursesData.carreras) : []

    const getCyclesByCareer = () => {
        if (!selectedCareer || !coursesData) return []
        const career = coursesData.carreras[selectedCareer]
        return Object.keys(career.ciclos).sort((a, b) => Number(a) - Number(b))
    }

    const getCourses = () => {
        if (!selectedCareer || !coursesData) return []

        const career = coursesData.carreras[selectedCareer]

        if (selectedCycle) {
            const cycleCourses = career.ciclos[selectedCycle]
            if (!cycleCourses) return []

            return [{
                cycle: selectedCycle,
                courses: cycleCourses.flatMap(courseObj => {
                    const courseName = Object.keys(courseObj)[0]
                    const sections = courseObj[courseName]

                    return {
                        name: courseName.trim(),
                        sections: sections,
                        careerId: selectedCareer,
                        careerName: career.nombre,
                        careerCode: career.codigo,
                        cycle: selectedCycle
                    }
                })
            }]
        }

        return Object.entries(career.ciclos)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([cycleNumber, cycleCourses]) => ({
                cycle: cycleNumber,
                courses: cycleCourses.flatMap(courseObj => {
                    const courseName = Object.keys(courseObj)[0]
                    const sections = courseObj[courseName]

                    return {
                        name: courseName.trim(),
                        sections: sections,
                        careerId: selectedCareer,
                        careerName: career.nombre,
                        careerCode: career.codigo,
                        cycle: cycleNumber
                    }
                })
            }))
    }

    const coursesByCycle = getCourses()

    return createPortal(
        <section className='top-0 left-0 p-4 fixed w-full h-full z-30 dark:bg-black/10 bg-black/50 backdrop-blur-sm place-content-center grid text-white'>
            <div ref={modalRef} className="rounded-lg border p-5 bg-white dark:bg-bg-card border-gray-500 w-[90vw] max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-black dark:text-white font-bold">Cursos</h3>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition" onClick={onClose}>
                        <IconX />
                    </button>
                </div>

                {/* Loading states */}
                {isLoading && (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                        Cargando cursos...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-600 py-8">
                        Error: {error}
                    </p>
                )}

                {/* Filters */}
                {!isLoading && !error && (
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4 w-full">
                        <div className="gap-3 flex flex-wrap  w-full">
                            <select
                                name="career"
                                id="career"
                                className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10"
                                value={selectedCareer}
                                onChange={(e) => {
                                    setSelectedCareer(e.target.value)
                                    setSelectedCycle("")
                                }}
                            >
                                <option value="">Selecciona una carrera</option>
                                {careers.map(([key, career]) => (
                                    <option key={key} value={key}>
                                        {career.nombre}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="cycle"
                                id="cycle"
                                className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10 disabled:opacity-50"
                                value={selectedCycle}
                                onChange={(e) => setSelectedCycle(e.target.value)}
                            >
                                <option value="">Selecciona un ciclo</option>
                                {getCyclesByCareer().map((cycle) => (
                                    <option key={cycle} value={cycle}>
                                        Ciclo {cycle}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Courses list */}
                <div className="flex-1 overflow-y-auto">
                    {!selectedCareer && (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                            Selecciona una carrera
                        </p>
                    )}

                    {selectedCareer && coursesByCycle.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                            No hay cursos disponibles
                        </p>
                    )}

                    {selectedCareer && coursesByCycle.length > 0 && (
                        <div className="space-y-6">
                            {coursesByCycle.map((cycleGroup, cycleIdx) => (
                                <div key={cycleIdx}>

                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3 pb-2 border-b border-[#333]">
                                        Ciclo {cycleGroup.cycle}
                                    </h3>


                                    <div className="space-y-3">
                                        {cycleGroup.courses.map((course, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-[#444] rounded-lg p-4 "
                                            >
                                                <h4 className="font-semibold text-black dark:text-white mb-3">
                                                    {course.name}
                                                </h4>

                                                <div className="space-y-2">
                                                    {course.sections.map((section, secIdx) => (
                                                        <div
                                                            key={secIdx}
                                                            className="p-3 dark:bg-bg-card rounded-lg border border-[#444]"
                                                        >
                                                            <div className="flex justify-between items-center gap-3 flex-wrap">
                                                                <div className="flex-1">
                                                                    <span className="inline-block px-2 py-1 bg-bg-field text-black dark:text-white text-xs font-semibold rounded-2xl mb-2">
                                                                        Sección {section.section}
                                                                    </span>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                        {section.teacher}
                                                                    </p>

                                                                    <div className="flex flex-wrap gap-2">
                                                                        {section.horario.map((schedule) => (
                                                                            <span
                                                                                key={schedule.id}
                                                                                className="text-xs 
                                                                                bg-bg-field text-gray-700 dark:text-gray-300 px-2 py-1 rounded-2xl"
                                                                            >
                                                                                {schedule.day}: {schedule.start} - {schedule.end}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => console.log('Add:', course.name, section.section)}
                                                                    className="p-3 border border-[#444] text-white rounded-full transition"
                                                                >
                                                                    <Plus />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>,
        document.body
    )
}