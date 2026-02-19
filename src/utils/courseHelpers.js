export const getCyclesByCareer = (coursesData, selectedCareer) => {
    if (!selectedCareer || !coursesData) return []
    const career = coursesData.carreras[selectedCareer]
    return Object.keys(career.ciclos).sort((a, b) => Number(a) - Number(b))
}

export const getCoursesByCycle = (coursesData, selectedCareer, selectedCycle) => {
    if (!selectedCareer || !coursesData) return []
    const career = coursesData.carreras[selectedCareer]

    const buildCourses = (cycleNumber, cycleCourses) =>
        cycleCourses.flatMap(courseObj => {
            const courseName = Object.keys(courseObj)[0]
            return {
                name: courseName.trim(),
                sections: courseObj[courseName],
                careerId: selectedCareer,
                careerName: career.nombre,
                careerCode: career.codigo,
                cycle: cycleNumber
            }
        })

    if (selectedCycle) {
        const cycleCourses = career.ciclos[selectedCycle]
        if (!cycleCourses) return []
        return [{ cycle: selectedCycle, courses: buildCourses(selectedCycle, cycleCourses) }]
    }

    return Object.entries(career.ciclos)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([cycleNumber, cycleCourses]) => ({
            cycle: cycleNumber,
            courses: buildCourses(cycleNumber, cycleCourses)
        }))
}