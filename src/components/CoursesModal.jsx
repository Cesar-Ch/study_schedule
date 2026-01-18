import { useRef } from 'react'
import { IconCheck, IconX } from "./Icons"
import { createPortal } from "react-dom"
import { useEffect } from 'react'
import { useCoursesData } from '../hooks/useCoursesData'
import { useState } from 'react'


export const CoursesModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const { coursesData, isLoading, error } = useCoursesData()
    const [selectedCarrera, setSelectedCarrera] = useState("")
    const [selectedCiclo, setSelectedCiclo] = useState("")
    const [searchTerm, setSearchTerm] = useState("")


    if (!isOpen) return null

    const carreras = coursesData ? Object.entries(coursesData.carreras) : []

    const getCiclosDisponibles = () => {
        if (!selectedCarrera || !coursesData) return []
        const carrera = coursesData.carreras[selectedCarrera]
        return Object.keys(carrera.ciclos).sort((a, b) => Number(a) - Number(b))
    }


    return createPortal(
        <section className='top-0 left-0 p-4 fixed w-full h-full z-30 dark:bg-black/10 bg-black/50  backdrop-blur-xs place-content-center grid text-white'>
            <div ref={modalRef} className="rounded-lg border p-5 bg-white dark:bg-bg-card border-gray-500 w-[90vw]">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-black dark:text-white ">Ciclo: 26 - I</h3>
                    <div className="text-black dark:text-white top-10 right-10 hover:text-black dark:hover:text-white" onClick={onClose}>
                        <IconX />
                    </div>
                </div>

                {/* Estados de carga */}
                {isLoading && (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                        Cargando cursos...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-600 py-8">
                        Error: {error}
                    </p>
                )}

                {/* Filtros */}
                {!isLoading && !error && (
                    <div className="flex items-center justify-between flex-wrap">
                        <div>
                            <h3 className="text-black dark:text-white">
                                Cursos
                            </h3>
                        </div>
                        <div className="gap-3 flex flex-wrap justify-end">
                            <select name="career" id="career" className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10" value={selectedCarrera} onChange={(e) => {
                                setSelectedCarrera(e.target.value)
                                setSelectedCiclo("")
                            }}>
                                <option value="">Selecciona una carrera</option>
                                {carreras.map(([key, carrera]) => (
                                    <option key={key} value={key}>
                                        {carrera.nombre}
                                    </option>
                                ))}
                            </select>


                            <select name="cycle" id="cycle" className="w-full sm:w-auto dark:bg-bg-card border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10" value={selectedCiclo} onChange={(e) => {
                                setSelectedCiclo(e.target.value)

                            }}

                            >
                                <option value="">Selecciona un ciclo</option>
                                {getCiclosDisponibles().map((ciclo) => (
                                    <option key={ciclo} value={ciclo}>
                                        Ciclo {ciclo}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                )}
            </div>
        </section>
        , document.body)
}
