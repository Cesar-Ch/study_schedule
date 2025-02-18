import { useEffect, useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"
import ToastError from "./components/ToastError"


function App() {

  const [timeCross, setTimeCross] = useState(false)
  const [datos, setDatos] = useState(() => {
    const storedDatos = localStorage.getItem('datos')
    return storedDatos ? JSON.parse(storedDatos) : {}
  })
  const [selectedCourse, setSelectedCourse] = useState({})

  useEffect(() => {
    localStorage.setItem('datos', JSON.stringify(datos))
  }, [datos])

  return (

    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {
        timeCross && <ToastError />
      }

      <div>
        <section className="p-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg border-black dark:border-white dark:bg-[#172754]/10">
          <AddCourse setDatos={setDatos} datos={datos} />
        </section>

        <section className="p-6 mt-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg  border-black dark:border-white dark:bg-[#172754]/10 ">
          <ListCourses setDatos={setDatos} datos={datos} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setTimeCross={setTimeCross} />
        </section>
      </div>


      <section className="p-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg  border-black dark:border-white dark:bg-[#172754]/10">
        <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </section>
    </div>


  )
}

export default App
