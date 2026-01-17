import { use } from "react"
import { useState, useEffect } from "react"
import { createContext } from "react"

const CoursesContext = createContext()

export const CoursesProvider = ({children}) => {
    const [selectedCourses, setSelectedCourses] = useState(() => {
        const savedCourses = localStorage.getItem("selectedCourses") 
        return savedCourses ? JSON.parse(savedCourses) : []
    })

    useEffect(() => {
        localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses))
    }, [selectedCourses])

    const value = {
        selectedCourses
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