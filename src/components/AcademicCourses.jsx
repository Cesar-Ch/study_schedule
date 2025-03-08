import { useRef, useState } from "react"
import { IconAdd, IconCheck, IconX } from "./Icons"
import courseData from '../data/cursos.json'

const AcademicCourses = ({ setShowAcdCourses, showAcdCourses, setShowToast, setTypeToast, setMessage, showToast, datos, setDatos }) => {
    const [cicloAdd, setCicloAdd] = useState(Array.from({ length: 10 }).map(() => false))
    const timeoutRef = useRef(false)

    const handleAddCiclo = (i) => {

        for (let j = 0; j < courseData[i + 1].length; j++) {

            if (!datos[Object.keys(courseData[i + 1][j])]) {

                setDatos((prevDatos) => {
                    const newDatos = { ...prevDatos };
                    newDatos[Object.keys(courseData[i + 1][j])] = [...Object.values(courseData[i + 1][j])[0]]
                    return newDatos;
                });
            }
        }



        setCicloAdd((prevCicloAdd) => {
            const newCicloAdd = [...prevCicloAdd];
            newCicloAdd[i] = true;
            return newCicloAdd;
        });

        setShowToast(true)
        setTypeToast('success')
        setMessage('Ciclo agregado')

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(
            () => {
                setCicloAdd((prevCicloAdd) => {
                    const newCicloAdd = [...prevCicloAdd];
                    newCicloAdd.forEach((_, index) => newCicloAdd[index] = false)
                    return newCicloAdd;
                });

                setShowToast(false)
                setTypeToast('')
                setMessage('')
                timeoutRef.current = null
            }, 1500)

    }

    console.log(courseData)
    console.log(Object.values(courseData[1][0])[0])
    console.log(datos)

    return (

        <section className='top-0 left-0 fixed w-screen h-screen  z-30 dark:bg-black/50 bg-black/80  backdrop-blur-[4px] place-content-center grid text-white '>
            <div className="rounded-lg border p-5 border-white bg-black/30 ">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-white ">Ciclo: 25 - I</h3>
                    <div className=" top-10 right-10 hover:text-black dark:hover:text-white" onClick={() => setShowAcdCourses(!showAcdCourses)}>
                        <IconX />
                    </div>
                </div>
                <h3>Ing. de Sistemas y Computación</h3>
                <div className="flex flex-col mt-2">
                    {
                        Object.values(courseData).map((e, i) => (
                            <div key={i} className="flex justify-between items-center my-1">
                                <p className="">Ciclo {i + 1}</p>

                                <div >
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