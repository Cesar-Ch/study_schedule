import { useState } from "react"
import { useCourses } from "@/context/CoursesContext"
import { useToast } from "@/context/ToastContext"

export const useModalCourses = () => {
    const { addCourse } = useCourses()
    const { showToast } = useToast()
    const [addedCourses, setAddedCourses] = useState(new Set())

    const markAsAdded = (id) => {
        setAddedCourses(prev => new Set(prev).add(id))
        setTimeout(() => {
            setAddedCourses(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }, 2000)
    }

    const handleAddCourse = (course) => {
        const id = `${course.careerId}-${course.cycle}-${course.name}`.replace(/\s+/g, '-')
        addCourse({
            id,
            nombre: course.name,
            sections: course.sections,
            carrera: course.careerName,
            carreraCodigo: course.careerCode,
            carreraId: course.careerId,
            ciclo: course.cycle,
        })
        showToast('Curso agregado exitosamente', 'success')
        markAsAdded(id)
    }

    const handleAddTaller = (taller) => {
        const id = `taller-${taller.nombre.trim()}`.replace(/\s+/g, '-')
        addCourse({
            id,
            nombre: taller.nombre,
            sections: taller.sections,
            tipo: 'taller'
        })
        showToast('Taller agregado exitosamente', 'success')
        markAsAdded(id)
    }

    return { addedCourses, handleAddCourse, handleAddTaller }
}