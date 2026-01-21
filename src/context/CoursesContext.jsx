import { use } from "react"
import { useState, useEffect } from "react"
import { createContext } from "react"

const CoursesContext = createContext()

export const CoursesProvider = ({ children }) => {
    const [selectedCourses, setSelectedCourses] = useState(() => {
        const savedCourses = localStorage.getItem("selectedCourses")
        return savedCourses ? JSON.parse(savedCourses) : []
    })
    const [selectedSchedule, setSelectedSchedule] = useState(() => {
        const savedSchedule = localStorage.getItem("selectedSchedule")
        return savedSchedule ? JSON.parse(savedSchedule) : []
    })

    useEffect(() => {
        localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses))
    }, [selectedCourses])

    useEffect(() => {
        localStorage.setItem("selectedSchedule", JSON.stringify(selectedSchedule))
    }, [selectedSchedule])


    const addCourse = (course) => {
        setSelectedCourses(prev => {
            if (!course.id) {
                return prev;
            }

            const exists = prev.some(c => c.id === course.id);
            if (exists) {
                
                return prev;
            }

            return [...prev, course];
        });
    };

    const removeCourse = (courseId) => {
        setSelectedCourses(prev => prev.filter(c => c.id !== courseId));
    };

    const addSchedule = (schedule) => {
        setSelectedSchedule(prev => {
            const exists = prev.some(s => s.id === schedule.id);
            if (exists) {
                return prev.map(s => s.id === schedule.id ? { ...s, schedule: schedule.schedule } : s);
            }
            return [...prev, schedule];

        });
    }


    const value = {
        selectedCourses,
        addCourse,
        removeCourse,
        selectedSchedule,
        addSchedule
    }
    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    )
}


export const useCourses = () => {
    const context = use(CoursesContext)
    if (!context) {
        throw new Error("useCourses must be used within a CoursesProvider")
    }
    return context
}