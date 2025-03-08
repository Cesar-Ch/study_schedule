import { useState } from "react"
import { IconAdd, IconCheck, IconX } from "./Icons"
import {courseData} from '../data/cursos.json'

const AcademicCourses = ({ setShowAcdCourses, showAcdCourses, setShowToast, setTypeToast, setMessage, showToast }) => {
    const [cicloAdd, setCicloAdd] = useState(Array.from({ length: 10 }).map(() => false))

    const handleAddCiclo = (i) => {
        const newCicloAdd = [...cicloAdd]
        newCicloAdd[i] = !newCicloAdd[i]
        setCicloAdd(newCicloAdd)

        setShowToast(true)
        setTypeToast('success')
        setMessage('Ciclo agregado')

        const newInterval = setTimeout(
            () => {
                
                const newCicloAdd = [...cicloAdd]
                newCicloAdd[i] = false
                setCicloAdd(newCicloAdd)

                setShowToast(false)
                setTypeToast('')
                setMessage('')
                clearTimeout(newInterval)
            }
            , 1500)
    }

    console.log(courseData)

    return (

        <section className='top-0 left-0 fixed w-screen h-screen  z-30 bg-black/70 place-content-center grid'>
            <div className="rounded-lg border p-5">
                <div className="flex justify-between items-center mb-5">
                    <h3>Ciclo: 25 - I</h3>
                    <div className=" top-10 right-10" onClick={() => setShowAcdCourses(!showAcdCourses)}>
                        <IconX />
                    </div>
                </div>
                <h3>Ing. de Sistemas y Computación</h3>
                <div className="flex flex-col mt-2">
                    {
                        Object.values(courseData).map((e, i) => (
                            <div key={i} className="flex justify-between items-center my-1">
                                <p className="">Ciclo {i + 1}</p>

                                <div className={`${showToast ? "pointer-events-none" : ""}`}>
                                    {
                                        cicloAdd[i] ?
                                            (
                                                <IconCheck />
                                            ) :
                                            <div onClick={() => handleAddCiclo(i)}>
                                                <IconAdd />
                                            </div>

                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>



            </div>
        </section>
    )
}

export default AcademicCourses