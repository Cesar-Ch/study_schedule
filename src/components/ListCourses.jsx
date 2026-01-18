import { useState } from "react"
import { Accordion, GraduationCap, IconX, Trash, UsatLogo } from "./Icons"
import { CoursesModal } from "./CoursesModal"


export const ListCourses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className=" card p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-black dark:text-white ">Lista de cursos</h2>
                <div className="flex items-center py-2 px-3 rounded-sm border text-black font-medium dark:text-white dark:bg-transparent transition hover:bg-light-pri/50 hover:cursor-pointer dark:hover:bg-dark-pri gap-2"
                    onClick={() => setIsModalOpen(true)}>
                    <GraduationCap />
                    Cursos USAT
                </div>
            </div>

            <CoursesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>

    )
}
