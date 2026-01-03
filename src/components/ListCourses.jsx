// import { useState } from "react";
// import { Accordion, GraduationCap, IconX, Trash, UsatLogo } from "./Icons";
// import { useCourses } from "../context/CoursesContext";
// import { useToast } from "../context/ToastContext";

// const ListCourses = ({ setIsModalOpen, isModalOpen }) => {
//     const { userCourses, setUserCourses, selectedCourses, setSelectedCourses } = useCourses();
//     const { showToastMessage } = useToast();
//     const [openSection, setOpenSection] = useState(null);


//     const toggleSection = (section) => {
//         setOpenSection(openSection === section ? null : section);
//     };

//     const deleteSingleSchedule = (e, curso, j) => {

//         const input = e.target.closest(".relative").querySelector("input[type='radio']")

//         if (input.checked) {
//             setSelectedCourses((prevSelectedCourse) => {
//                 const selectedCourseCopy = { ...prevSelectedCourse }
//                 delete selectedCourseCopy[curso]
//                 return selectedCourseCopy
//             })
//         }
//         setUserCourses((prevdatos) => {
//             const cursosActualizados = { ...prevdatos };
//             cursosActualizados[curso].splice(j, 1)
//             if (cursosActualizados[curso].length === 0) {
//                 delete cursosActualizados[curso]
//             }
//             return cursosActualizados;
//         });
//     }
//     const deleteCourse = (e, course) => {
//         e.stopPropagation()
//         const prevDatos = { ...userCourses }
//         delete prevDatos[course]
//         setUserCourses(prevDatos)
//     }

//     const checkCross = (e, curso, dato) => {
//         const selectedCourseKeys = Object.keys(selectedCourses)
//         const seletedCourseValues = Object.values(selectedCourses)
//         let cruce = false
//         for (let i = 0; i < selectedCourseKeys.length; i++) {
//             const horario = seletedCourseValues[i].horario[0]
//             const horarioDato = dato.horario[0]

//             if (selectedCourseKeys[i] === curso) continue

//             for (let j = 0; j < horario.length; j++) {
//                 for (let k = 0; k < horarioDato.length; k++) {
//                     if (horario[j].day === horarioDato[k].day) {
//                         const [hourStart, minuteStart] = horario[j].start.split(":")
//                         const [hourEnd, minuteEnd] = horario[j].end.split(":")
//                         const [hourStartDato, minuteStartDato] = horarioDato[k].start.split(":")
//                         const [hourEndDato, minuteEndDato] = horarioDato[k].end.split(":")

//                         const start = new Date(0, 0, 0, hourStart, minuteStart).getTime()
//                         const end = new Date(0, 0, 0, hourEnd, minuteEnd).getTime()
//                         const startDato = new Date(0, 0, 0, hourStartDato, minuteStartDato).getTime()
//                         const endDato = new Date(0, 0, 0, hourEndDato, minuteEndDato).getTime()

//                         if ((startDato >= start && startDato < end) || (endDato > start && endDato <= end) || (startDato <= start && endDato >= end)) {
//                             cruce = true
//                             break
//                         }
//                     }
//                 }
//             }
//         }

//         if (cruce) {
//             setShowToast(true)
//             setMessage('Cruce de horarios')
//             setTypeToast('error')
//             setTimeout(() => {
//                 setShowToast(false);
//             }, 3000)
//             e.target.checked = false
//             return
//         }

//         setSelectedCourse((prevSelectedCourse) => {
//             return {
//                 ...prevSelectedCourse,
//                 [curso]: dato
//             }

//         })
//     }

//     const editSelectedCourse = (e, curso, dato) => {

//         e.target.checked = !e.target.checked
//         if (e.target.checked) {
//             checkCross(e, curso, dato)
//         } else {
//             setSelectedCourse((prevSelectedCourse) => {
//                 const selectedCourseCopy = { ...prevSelectedCourse }
//                 delete selectedCourseCopy[curso]
//                 return selectedCourseCopy
//             })
//         }
//     }

//     return (
//         <section className="mt-6 section-custom">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-semibold  ">Lista de cursos</h2>
//                 <div className="flex items-center py-2 px-3 rounded-sm border text-black font-medium dark:text-white dark:bg-transparent transition hover:bg-light-pri/50  hover:cursor-pointer dark:hover:bg-dark-pri gap-2" onClick={() => setIsModalOpen(!isModalOpen)}>
//                     <GraduationCap />
//                     Cursos USAT
//                 </div>
//             </div>

//             {
//                 Object.keys(userCourses).map((curso, i) => (
//                     <div key={curso} className="mb-2">
//                         <div
//                             className={`relative overflow-hidden flex items-center justify-between w-full p-4 font-medium rtl:text-right border rounded-lg  border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-dark-pri gap-3 ${openSection === i ? "bg-gray-100 dark:bg-dark-pri rounded-b-none" : ""
//                                 }`}
//                             onClick={() => toggleSection(i)}
//                         >
//                             <div className="flex items-center gap-2 text-sm">
//                             <div className={`w-1 absolute top-0 left-0 h-full  ${curso in selectedCourse ? "flex bg-[#1579ff]":"hidden"}`}>
//                                 </div>
//                                 <Accordion i={i} openSection={openSection} />
//                                 <span className={`${curso in selectedCourse ? "text-gray-800 dark:text-gray-200":"text-gray-600 dark:text-gray-400"}`}>{curso}</span> 
//                                 <span className={`text-white bg-[#1579ff] px-2 py-1 rounded-lg  ${curso in selectedCourse ? "flex":"hidden"}`}> ({selectedCourse[curso]?.section}) </span>
//                             </div>
//                             <button className="rounded p-1 text-[#f1364e] hover:bg-red-300/30 dark:hover:bg-red-900/50 dark:hover:text-red-300" onClick={(e) => deleteCourse(e, curso)}>
//                                 <Trash />
//                             </button>
//                         </div>

//                         {
//                             userCourses[curso].map((dato, j) => (

//                                 <div key={`${curso}-${j}`}
//                                     className={`relative ${openSection === i ? "flex" : "hidden"} p-4 dark:bg border  border-gray-200 dark:border-gray-700 items-center`}
//                                 >
//                                     <div className="absolute right-3" onClick={(e) => deleteSingleSchedule(e, curso, j)}>
//                                         <IconX />
//                                     </div>
//                                     <div className="flex items-center justify-center">
//                                         <input id={`schedule-${i}-${j}`} type="radio" value="" name={`course-${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
//                                             onChange={(e) => editSelectedCourse(e, curso, dato)} onClick={(e) => editSelectedCourse(e, curso, dato)} />
//                                         <label htmlFor={`schedule-${i}-${j}`} className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">{dato.teacher} ({dato.section})
//                                             <div className="flex items-center gap-2">
//                                                 {
//                                                     dato.horario[0].map((horario, k) => (
//                                                         <span key={`${curso}-${j}-${k}`} className="text-gray-500 dark:text-gray-400 text-xs">{horario.day} {horario.start} - {horario.end}</span>
//                                                     ))
//                                                 }
//                                             </div>
//                                         </label>
//                                     </div>

//                                 </div>
//                             ))}
//                     </div>
//                 ))}

//         </section>
//     );
// };


export const ListCourses = () => {
  return (
    <div>ListCourses</div>
  )
}
