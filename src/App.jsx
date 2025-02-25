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
        <section className="section-custom">
          <AddCourse setDatos={setDatos} datos={datos} />
        </section>

        <section className="mt-6 section-custom">
          <ListCourses setDatos={setDatos} datos={datos} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setTimeCross={setTimeCross} />
        </section>
      </div>


      <section className="section-custom">
        <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </section>
    </div>


  )
}

export default App
