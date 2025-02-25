import { useEffect, useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"
import ToastError from "./components/ToastError"
import { IconGithub, IconLogo } from "./components/Icons"


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
    <div>
      <header className="border-b-1">
        <div className="flex justify-between items-center mx-auto px-6 py-3">
          <div className="flex items-center gap-2 transition-all duration-500 ease-in-out">
          <IconLogo className="text-white dark:text-black" />
            Schedule
          </div>
          <a href="https://github.com/Cesar-Ch/study_schedule" target="_blank" className="transition-all duration-500 ease-in-out">
            <IconGithub />
          </a>
        </div>
      </header>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
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
    </div>
  )
}

export default App
