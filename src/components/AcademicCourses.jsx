import { useEffect, useRef, useState } from "react"
import { IconCheck, IconX } from "./Icons"
import courseData from '../data/cursos.json'

const AcademicCourses = ({ setIsModalOpen, isModalOpen, setShowToast, setTypeToast, setMessage, showToast, userCourses, setUserCourses }) => {

    const [filteredCycles, setFilteredCycles] = useState(courseData)
    const [cycleAddStatus, setCycleAddStatus] = useState({})
    const timeoutRef = useRef(false)
    const modalRef = useRef(null)
    const timeoutRefs = useRef({})


    const handleCycleFilter = (cycleNumber) => {
        if (cycleNumber == 'all') {
            setFilteredCycles(courseData)
            return
        }

        const filteredData = {
            [cycleNumber]: courseData[cycleNumber]
        }

        setFilteredCycles(filteredData)
    }

    const AddCicle = (i) => {

        for (let j = 0; j < courseData[i].length; j++) {

            if (!userCourses[Object.keys(courseData[i][j])]) {

                setUserCourses((prevDatos) => {
                    const newDatos = { ...prevDatos };
                    newDatos[Object.keys(courseData[i][j])] = [...Object.values(courseData[i][j])[0]]
                    return newDatos;
                });
            }
        }

        setCycleAddStatus(
            (prevCicloAdd) => {
                const newCicloAdd = { ...prevCicloAdd };
                newCicloAdd[i] = { ...newCicloAdd[i], added: true };
                return newCicloAdd;
            }
        )

        setShowToast(true)
        setTypeToast('success')
        setMessage('Ciclo agregado')

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(
            () => {
                setCycleAddStatus((prevCicloAdd) => {
                    const newCicloAdd = { ...prevCicloAdd };
                    newCicloAdd[i] = { ...newCicloAdd[i], added: false };
                    return newCicloAdd;
                });

                setShowToast(false)
                setTypeToast('')
                setMessage('')
                timeoutRef.current = null
            }, 1500)

    }

    const handleAddCourse = (i, j, c) => {

        if (!userCourses[c]) {
            setUserCourses((prevDatos) => {
                const newDatos = { ...prevDatos }
                newDatos[c] = courseData[i][j][c]
                return newDatos
            })
        }

        setCycleAddStatus(
            (prevCicloAdd) => {
                const newCicloAdd = { ...prevCicloAdd };
                const ciclo = { ...newCicloAdd[i] };
                const courses = { ...ciclo.courses };

                courses[c] = { ...courses[c], added: true };

                ciclo.courses = courses;
                newCicloAdd[i] = ciclo;

                return newCicloAdd;
            }
        )

        setShowToast(true)
        setTypeToast('success')
        setMessage('Curso agregado')

        if (timeoutRefs.current[c]) {
            clearTimeout(timeoutRefs.current[c]);
        }

        timeoutRefs.current[c] = setTimeout(
            () => {
                setCycleAddStatus((prevCicloAdd) => {
                    const newCicloAdd = { ...prevCicloAdd };
                    const ciclo = { ...newCicloAdd[i] };
                    const courses = { ...ciclo.courses };

                    courses[c] = { ...courses[c], added: false };

                    ciclo.courses = courses;
                    newCicloAdd[i] = ciclo;

                    return newCicloAdd;
                });

                setShowToast(false)
                setTypeToast('')
                setMessage('')
                timeoutRefs.current[c] = null;
            }, 1500)
    }

    useEffect(() => {
        const controlClickExt = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsModalOpen(false)
            }
        }

        if (isModalOpen) {
            document.addEventListener('mousedown', controlClickExt)
        }
        return () => {
            document.removeEventListener('mousedown', controlClickExt)
        }
    }, [isModalOpen])


    useEffect(() => {
        const addStatus = (obj) => {
            const resultado = {};

            for (const ciclo in obj) {
                resultado[ciclo] = {
                    added: false,
                    courses: []
                };

                const cursos = obj[ciclo];

                for (const cursoObj of cursos) {
                    for (const cursoNombre in cursoObj) {
                        resultado[ciclo].courses[cursoNombre] = {
                            added: false
                        }
                    }
                }
            }

            return resultado;
        };

        const cursosTransformados = addStatus(courseData);
        setCycleAddStatus(cursosTransformados)
    }, []);


    return (

        <section className='top-0 left-0 fixed w-screen h-screen  z-30 dark:bg-black/10 bg-black/50  backdrop-blur-xs place-content-center grid text-white'>
            <div ref={modalRef} className="rounded-lg border p-5  bg-white dark:bg-dark-sec border-gray-500 w-[90vw]">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-black dark:text-white ">Ciclo: 25 - II</h3>
                    <div className="text-black dark:text-white top-10 right-10 hover:text-black dark:hover:text-white" onClick={() => setIsModalOpen(!isModalOpen)}>
                        <IconX />
                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap">
                    <div>
                        <h3 className="text-black dark:text-white">
                            Cursos
                        </h3>
                    </div>
                    <div className="gap-3 flex flex-wrap justify-end">
                        <select name="career" id="" className="w-full sm:w-auto dark:bg-dark-sec border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10">
                            <option value="all">Todas las carreras</option>
                            <option value="sis">Ingeniería de sistemas</option>
                        </select>


                        <select name="cycle" id="" className="w-full sm:w-auto dark:bg-dark-sec border rounded-md text-gray-900 dark:text-gray-100 px-3 py-2 text-sm h-10" onChange={(e) => handleCycleFilter(e.target.value)}>
                            <option value="all" className="dark:bg-black">Todos los ciclos</option>
                            {
                                Array.from({ length: 10 }).map((_, i) => (
                                    <option key={i} value={i + 1} >Ciclo {i + 1}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
                <div className="overflow-auto h-80 ">
                    {
                        Array.from(Object.entries(filteredCycles), ([key, value]) => (
                            <div>
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 my-7">Ciclo {key}</h3>

                                    <button className="transition-all duration-200 bg-[#1579ff] hover:bg-blue-600 text-white rounded-md px-3 cursor-pointer text-sm h-9 w-50 flex justify-center items-center" onClick={() => AddCicle(key)}>{cycleAddStatus[key]?.added ? <IconCheck /> : 'Agregar todos los cursos'}</button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {
                                        value.map((curso, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border  border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 ">
                                                <p className="font-medium text-gray-900 dark:text-gray-100 ">
                                                    {Object.keys(curso)}
                                                </p>

                                                <button className="transition-all duration-200 bg-[#1579ff] hover:bg-blue-600  text-white rounded-md px-3 cursor-pointer text-sm h-9 w-20 flex justify-center items-center" onClick={() => handleAddCourse(key, i, Object.keys(curso))}>
                                                    {cycleAddStatus[key]?.courses[Object.keys(curso)]?.added ? <IconCheck /> : 'Agregar'}
                                                </button>

                                            </div>

                                        ))
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