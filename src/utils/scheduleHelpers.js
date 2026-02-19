export const buildScheduleId = (course) =>
    `${course.carreraId}-schedule-${course.nombre}-${course.ciclo}`

export const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

export const getCourseForCell = (day, hour, selectedSchedule) => {
    const hourStart = hour.split(' - ')[0]
    const courses = []

    selectedSchedule.forEach(schedule => {
        schedule.schedule.horario.forEach(horario => {
            const normalizeHour = (time) => parseInt(time.split(':')[0])
            const cellHour = normalizeHour(hourStart)
            const courseStartHour = normalizeHour(horario.start)
            const courseEndHour = normalizeHour(horario.end)

            if (horario.day === day && cellHour >= courseStartHour && cellHour < courseEndHour) {
                courses.push({
                    nombre: schedule.nombre,
                    teacher: schedule.schedule.teacher,
                    start: horario.start,
                    end: horario.end,
                    section: schedule.schedule.section
                })
            }
        })
    })

    return courses
}