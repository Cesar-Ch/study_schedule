import { schedule } from "./data/schedule"
import { useState } from "react"
import CourseSchedule from "./components/CourseSchedule"
import Schedule from "./components/Schedule"

function App() {

  const [selectedCourses,  setSelectedCourses] = useState([
    ["7:00 - 8:00", "", "", "", "", "", "", "", ""],
    ["8:00 - 9:00", "", "", "", "", "", "", "", ""],
    ["9:00 - 10:00", "", "", "", "", "", "", "", ""],
    ["10:00 - 11:00", "", "", "", "", "", "", "", ""],
    ["11:00 - 12:00", "", "", "", "", "", "", "", ""],
    ["12:00 - 13:00", "", "", "", "", "", "", "", ""],
    ["13:00 - 14:00", "", "", "", "", "", "", "", ""],
    ["14:00 - 15:00", "", "", "", "", "", "", "", ""],
    ["15:00 - 16:00", "", "", "", "", "", "", "", ""],
    ["16:00 - 17:00", "", "", "", "", "", "", "", ""],
    ["17:00 - 18:00", "", "", "", "", "", "", "", ""],
    ["18:00 - 19:00", "", "", "", "", "", "", "", ""],
    ["19:00 - 20:00", "", "", "", "", "", "", "", ""],
    ["20:00 - 21:00", "", "", "", "", "", "", "", ""],
    ["21:00 - 22:00", "", "", "", "", "", "", "", ""],
])

  const courses = [
    "ANTROPOLOGIA_FILOSOFICA",
    "BASE_DE_DATOS",
    "DISENO_DE_SOFTWARE",
    "ECUACIONES_DIFERENCIALES_Y_METODOS_NUMERICOS",
    "ELECTRICIDAD_Y_MAGNETISMO",
    "ESTRUCTURA_DE_DATOS_Y_ALGORITMOS"
  ]

  console.log(selectedCourses)
  return (
    <section className="bg-[#111827] p-5 gap-5 flex justify-center">
      <div className="w-[35%] flex flex-col justify-center items-center flex-wrap gap-5">
        {
          courses.map((course, index) => (
            <CourseSchedule key={index}  item={schedule[0][course]} setSelectedCourses={setSelectedCourses}/>
          ))
        }
      </div>
      <Schedule selectedCourses={selectedCourses} />
    </section>
  )
}

export default App
