import { useCourses } from "@/context/CoursesContext"
import { useToast } from "@/context/ToastContext"

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

export const useScheduleActions = () => {
    const { selectedSchedule, addSchedule, removeCourse } = useCourses()
    const { showToast } = useToast()

    const checkScheduleConflict = (newSchedule) => {
        const isAlreadySelected = selectedSchedule.some(
            sch => sch.id === newSchedule.id && sch.schedule.section === newSchedule.schedule.section
        )
        if (isAlreadySelected) return false

        for (const existing of selectedSchedule) {
            if (existing.nombre === newSchedule.nombre) continue
            for (const newH of newSchedule.schedule.horario) {
                for (const existingH of existing.schedule.horario) {
                    if (newH.day !== existingH.day) continue
                    const newStart = timeToMinutes(newH.start)
                    const newEnd = timeToMinutes(newH.end)
                    const exStart = timeToMinutes(existingH.start)
                    const exEnd = timeToMinutes(existingH.end)
                    const hasConflict = (
                        (newStart >= exStart && newStart < exEnd) ||
                        (newEnd > exStart && newEnd <= exEnd) ||
                        (newStart <= exStart && newEnd >= exEnd)
                    )
                    if (hasConflict) {
                        showToast("¡Conflicto de horario!", "error")
                        return true
                    }
                }
            }
        }
        return false
    }

    const handleAddSchedule = (course, section) => {
        const scheduleId = `${course.carreraId}-schedule-${course.nombre}-${course.ciclo}`
        const newSchedule = {
            id: scheduleId,
            nombre: course.nombre,
            schedule: section,
            carrera: course.carrera,
            carreraId: course.carreraId,
            ciclo: course.ciclo,
        }
        if (checkScheduleConflict(newSchedule)) return
        addSchedule(newSchedule)
    }

    return { handleAddSchedule }
}