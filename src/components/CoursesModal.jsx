import { useRef, useEffect, useState } from 'react'
import { IconX } from "./Icons"
import { createPortal } from "react-dom"
import { useCoursesData } from '@/hooks/useCoursesData'
import { useModalCourses } from '@/hooks/useModalCourses'
import { getCyclesByCareer, getCoursesByCycle } from '@/utils/courseHelpers'
import { CourseCard } from './CourseCard'

export const CoursesModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null)
    const { coursesData, isLoading, error } = useCoursesData()
    const { addedCourses, handleAddCourse, handleAddTaller } = useModalCourses()

    const [viewMode, setViewMode] = useState("carreras")
    const [selectedCareer, setSelectedCareer] = useState("")
    const [selectedCycle, setSelectedCycle] = useState("")

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.toast')) {
                onClose()
            }
        }
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleKeyDown)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const careers = coursesData ? Object.entries(coursesData.carreras) : []
    const talleres = coursesData?.talleres || []
    const cycles = getCyclesByCareer(coursesData, selectedCareer)
    const coursesByCycle = getCoursesByCycle(coursesData, selectedCareer, selectedCycle)

    return createPortal(
        <section className='top-0 left-0 p-4 fixed w-full h-full z-70 dark:bg-black/10 bg-black/50 backdrop-blur-sm place-content-center grid text-white'>
            <div ref={modalRef} className="rounded-lg border bg-white dark:bg-bg-card border-gray-500 w-[90vw] max-w-5xl h-[75vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="pt-5 px-5 flex justify-between items-center mb-5">
                    <h3 className="text-black dark:text-white font-bold">Ciclo 2026-1</h3>
                    <button
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                        onClick={onClose}
                    >
                        <IconX className="rounded-md hover:scale-110 dark:hover:bg-[#3c3c3f] hover:bg-gray-100 p-1" />
                    </button>
                </div>

                {isLoading && <p className="text-center text-gray-600 dark:text-gray-400 py-8">Cargando...</p>}
                {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}

                {!isLoading && !error && (
                    <>
                        {/* Tabs */}
                        <div className="px-5 mb-3">
                            <div className="flex gap-2 p-1 bg-bg-field dark:bg-[#2a2a2a] rounded-lg w-fit">
                                {["carreras", "talleres"].map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                            viewMode === mode
                                                ? 'bg-white dark:bg-bg-card text-black dark:text-white shadow-sm'
                                                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                        }`}
                                    >
                                        {mode === "carreras" ? "Cursos de Carrera" : "Talleres"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filters */}
                        {viewMode === "carreras" && (
                            <div className="px-5 flex flex-wrap gap-3 w-full border-b pb-3 border-[#444]">
                                <select
                                    className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10"
                                    value={selectedCareer}
                                    onChange={(e) => { setSelectedCareer(e.target.value); setSelectedCycle("") }}
                                >
                                    <option value="">Selecciona una carrera</option>
                                    {careers.map(([key, career]) => (
                                        <option key={key} value={key}>{career.nombre}</option>
                                    ))}
                                </select>
                                <select
                                    className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10 disabled:opacity-50"
                                    value={selectedCycle}
                                    onChange={(e) => setSelectedCycle(e.target.value)}
                                    disabled={!selectedCareer}
                                >
                                    <option value="">Todos los ciclos</option>
                                    {cycles.map(cycle => (
                                        <option key={cycle} value={cycle}>Ciclo {cycle}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {viewMode === "carreras" ? (
                                <div className="space-y-6 px-5 pb-5">
                                    {!selectedCareer && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">Selecciona una carrera</p>
                                    )}
                                    {selectedCareer && coursesByCycle.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay cursos disponibles</p>
                                    )}
                                    {coursesByCycle.map(cycleGroup => (
                                        <div key={cycleGroup.cycle}>
                                            <h3 className="text-lg font-bold text-black dark:text-white mb-3 pb-2 border-b border-[#333] pt-1">
                                                Ciclo {cycleGroup.cycle}
                                            </h3>
                                            <div className="space-y-3">
                                                {cycleGroup.courses.map(course => {
                                                    const courseId = `${course.careerId}-${course.cycle}-${course.name}`.replace(/\s+/g, '-')
                                                    return (
                                                        <CourseCard
                                                            key={courseId}
                                                            name={course.name}
                                                            sectionsCount={course.sections.length}
                                                            isAdded={addedCourses.has(courseId)}
                                                            onAdd={() => handleAddCourse(course)}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3 px-5 pb-5 pt-3">
                                    {talleres.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay talleres disponibles</p>
                                    )}
                                    {talleres.map(taller => {
                                        const tallerId = `taller-${taller.nombre.trim()}`.replace(/\s+/g, '-')
                                        return (
                                            <CourseCard
                                                key={tallerId}
                                                name={taller.nombre}
                                                sectionsCount={taller.sections.length}
                                                isAdded={addedCourses.has(tallerId)}
                                                onAdd={() => handleAddTaller(taller)}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>,
        document.body
    )
}