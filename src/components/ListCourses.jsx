import { useState, useEffect } from "react"
import { GraduationCap } from "./Icons"
import { CoursesModal } from "./CoursesModal"
import { useCourses } from "@/context/CoursesContext"
import { Button } from "./Button"
import { useScheduleActions } from "@/hooks/useScheduleActions"
import { CourseItem } from "./CourseItem"

export const ListCourses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [expandedCourses, setExpandedCourses] = useState({})
    const { selectedCourses, removeCourse } = useCourses()
    const { handleAddSchedule } = useScheduleActions()

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            [courseId]: !prev[courseId]
        }))
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsModalOpen(prev => !prev)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <section className="card p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white">Lista de cursos</h2>
                <Button
                    className="border text-black font-medium dark:text-white dark:bg-transparent hover:bg-light-pri/50 hover:cursor-pointer dark:hover:bg-dark-pri"
                    onClick={() => setIsModalOpen(true)}
                >
                    <GraduationCap className="size-4" />
                    <p>Cursos USAT</p>
                </Button>
            </div>

            <div className="space-y-3">
                {selectedCourses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No hay cursos seleccionados
                    </p>
                ) : (
                    selectedCourses.map(course => (
                        <CourseItem
                            key={course.id}
                            course={course}
                            isExpanded={!!expandedCourses[course.id]}
                            onToggle={() => toggleCourse(course.id)}
                            onRemove={() => removeCourse(course.id)}
                            onAddSchedule={handleAddSchedule}
                        />
                    ))
                )}
            </div>

            <CoursesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}