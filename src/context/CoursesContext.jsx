import { use } from "react"
import { useState, useEffect } from "react"
import { createContext } from "react"

const CoursesContext = createContext()

export const CoursesProvider = ({ children }) => {
    const [selectedCourses, setSelectedCourses] = useState(() => {
        const savedCourses = localStorage.getItem("selectedCourses")
        return savedCourses ? JSON.parse(savedCourses) : []
    })

    useEffect(() => {
        localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses))
    }, [selectedCourses])

    
    const addCourse = (course) => {
        setSelectedCourses(prev => {
            if (!course.id) {
                console.error('El curso debe tener un ID');
                return prev;
            }

            const exists = prev.some(c => c.id === course.id);
            if (exists) {
                console.warn('El curso ya está agregado');
                return prev;
            }

            return [...prev, course];
        });
    };

    const removeCourse = (courseId) => {
        setSelectedCourses(prev => prev.filter(c => c.id !== courseId));
    };

    const value = {
        selectedCourses,
        addCourse,
        removeCourse
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