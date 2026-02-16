import {useRef, useEffect, useState} from 'react'
import {IconX, Plus, Check} from "./Icons"
import {createPortal} from "react-dom"
import {useCoursesData} from '../hooks/useCoursesData'
import {useCourses} from '../context/CoursesContext'
import {useToast} from '../context/ToastContext'

export const CoursesModal = ({isOpen, onClose}) => {
    const modalRef = useRef(null)
    const {coursesData, isLoading, error} = useCoursesData()
    const {addCourse} = useCourses()
    const {showToast} = useToast()

    const [viewMode, setViewMode] = useState("carreras")
    const [selectedCareer, setSelectedCareer] = useState("")
    const [selectedCycle, setSelectedCycle] = useState("")
    const [addedCourses, setAddedCourses] = useState(new Set())

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)
                && !event.target.closest('.toast')
            ) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const careers = coursesData ? Object.entries(coursesData.carreras) : []
    const talleres = coursesData?.talleres || []

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

    const handleAddCourse = (course) => {
        const courseId = `${course.careerId}-${course.cycle}-${course.name.trim()}`
            .replace(/\s+/g, '-')

        const newCourse = {
            id: courseId,
            nombre: course.name,
            sections: course.sections,
            carrera: course.careerName,
            carreraCodigo: course.careerCode,
            carreraId: course.careerId,
            ciclo: course.cycle,
        }

        addCourse(newCourse)
        showToast('Curso agregado exitosamente', 'success', 2000)

        setAddedCourses(prev => new Set(prev).add(courseId))

        setTimeout(() => {
            setAddedCourses(prev => {
                const newSet = new Set(prev)
                newSet.delete(courseId)
                return newSet
            })
        }, 2000)
    }

    const handleAddTaller = (taller) => {
        const tallerId = `taller-${taller.nombre.trim()}`
            .replace(/\s+/g, '-')

        const newTaller = {
            id: tallerId,
            nombre: taller.nombre,
            sections: taller.sections,
            tipo: 'taller'
        }

        addCourse(newTaller)
        showToast('Taller agregado exitosamente', 'success', 2000)

        setAddedCourses(prev => new Set(prev).add(tallerId))

        setTimeout(() => {
            setAddedCourses(prev => {
                const newSet = new Set(prev)
                newSet.delete(tallerId)
                return newSet
            })
        }, 2000)
    }

    return createPortal(
        <section
            className='top-0 left-0 p-4 fixed w-full h-full z-70 dark:bg-black/10 bg-black/50 backdrop-blur-sm place-content-center grid text-white'>
            <div ref={modalRef}
                 className="rounded-lg border bg-white dark:bg-bg-card border-gray-500 w-[90vw] max-w-5xl h-[75vh] flex flex-col overflow-hidden ">

                {/* Header */}
                <div className="pt-5 px-5 flex justify-between items-center mb-5">
                    <h3 className="text-black dark:text-white font-bold">
                        Ciclo 2026-1
                    </h3>
                    <button
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                        onClick={onClose}>
                        <IconX className="rounded-md hover:scale-110 dark:hover:bg-[#3c3c3f] hover:bg-gray-100 p-1"/>
                    </button>
                </div>

                {/* Loading states */}
                {isLoading && (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                        Cargando...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-600 py-8">
                        Error: {error}
                    </p>
                )}

                {!isLoading && !error && (
                    <>
                        {/* Tab selector */}
                        <div className="px-5 mb-3">
                            <div className="flex gap-2 p-1 bg-bg-field dark:bg-[#2a2a2a] rounded-lg w-fit">
                                <button
                                    onClick={() => setViewMode("carreras")}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                        viewMode === "carreras"
                                            ? 'bg-white dark:bg-bg-card text-black dark:text-white shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    Cursos de Carrera
                                </button>
                                <button
                                    onClick={() => {
                                        setViewMode("talleres")
                                    }}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                        viewMode === "talleres"
                                            ? 'bg-white dark:bg-bg-card text-black dark:text-white shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    Talleres
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div
                            className="px-5 flex items-center justify-between flex-wrap gap-3 w-full border-b pb-3 border-[#444]">
                            {viewMode === "carreras" && (
                                <div className="gap-3 flex flex-wrap w-full">
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
                                        disabled={!selectedCareer}
                                    >
                                        <option value="">Todos los ciclos</option>
                                        {getCyclesByCareer().map((cycle) => (
                                            <option key={cycle} value={cycle}>
                                                Ciclo {cycle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {viewMode === "carreras" ? (
                                <>
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
                                        <div className="space-y-6 px-5 pb-5">
                                            {coursesByCycle.map((cycleGroup, cycleIdx) => (
                                                <div key={cycleIdx}>
                                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3 pb-2 border-b border-[#333] pt-1">
                                                        Ciclo {cycleGroup.cycle}
                                                    </h3>

                                                    <div className="space-y-3">
                                                        {cycleGroup.courses.map((course, idx) => {
                                                            const courseId = `${course.careerId}-${course.cycle}-${course.name}`
                                                                .replace(/\s+/g, '-')

                                                            const showCheck = addedCourses.has(courseId)

                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="border border-[#444] rounded-lg p-4 flex justify-between items-center"
                                                                >
                                                                    <div>
                                                                        <h4 className="font-semibold text-black dark:text-white mb-2">
                                                                            {course.name}
                                                                        </h4>

                                                                        <span
                                                                            className="inline-block px-2 py-1 bg-bg-field text-black dark:text-white text-xs rounded-2xl">
                                                                            {course.sections.length}
                                                                            {course.sections.length === 1 ? ' sección' : ' secciones'}
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleAddCourse(course)}
                                                                        disabled={showCheck}
                                                                        className={`p-3 border border-[#444] rounded-full transition ${showCheck
                                                                            ? 'bg-brand border-brand-hover'
                                                                            : 'text-black dark:text-white hover:bg-bg-field'
                                                                        }`}
                                                                    >
                                                                        {showCheck ? <Check/> : <Plus/>}
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {talleres.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                                            No hay talleres disponibles
                                        </p>
                                    )}

                                    {talleres.length > 0 && (
                                        <div className="space-y-3 px-5 pb-5 pt-3">
                                            {talleres.map((taller, idx) => {
                                                const tallerId = `taller-${taller.nombre.trim()}`
                                                    .replace(/\s+/g, '-')

                                                const showCheck = addedCourses.has(tallerId)

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="border border-[#444] rounded-lg p-4 flex justify-between items-center"
                                                    >
                                                        <div>
                                                            <h4 className="font-semibold text-black dark:text-white mb-2">
                                                                {taller.nombre}
                                                            </h4>
                                                            <span
                                                                className="inline-block px-2 py-1 bg-bg-field text-black dark:text-white text-xs rounded-2xl">
                                                                {taller.sections.length}
                                                                {taller.sections.length === 1 ? ' sección' : ' secciones'}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddTaller(taller)}
                                                            disabled={showCheck}
                                                            className={`p-3 border border-[#444] rounded-full transition ${showCheck
                                                                ? 'bg-brand border-brand-hover'
                                                                : 'text-black dark:text-white hover:bg-bg-field'
                                                            }`}
                                                        >
                                                            {showCheck ? <Check/> : <Plus/>}
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>,
        document.body
    )
}