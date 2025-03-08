import { useEffect, useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"
import Toast from "./components/Toast"
import { IconGithub, IconLogo } from "./components/Icons"
import AcademicCourses from "./components/AcademicCourses"


function App() {

  const [datos, setDatos] = useState(() => {
    const storedDatos = localStorage.getItem('datos')
    return storedDatos ? JSON.parse(storedDatos) : {}
  })
  const [selectedCourse, setSelectedCourse] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')
  const [typeToast, setTypeToast] = useState('')
  const [showAcdCourses, setShowAcdCourses] = useState(false)

  useEffect(() => {
    localStorage.setItem('datos', JSON.stringify(datos))
  }, [datos])



  return (
    <div className="">
      <header className="border-b-1">
        <div className="flex justify-between items-center mx-auto px-6 py-3">
          <div className="flex items-center gap-2 transition-all duration-500 ease-in-out">
            <IconLogo className="text-white dark:text-black" />
            Schedule
          </div>
          <a href="https://github.com/Cesar-Ch/study_schedule" target="_blank" title="Visita el repositorio de este proyecto en GitHub" className="transition-all duration-500 ease-in-out">
            <IconGithub />
          </a>
        </div>
      </header>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {
          showToast && <Toast typeToast={typeToast}>{message}</Toast>
        }
        {
          showAcdCourses && <AcademicCourses setShowAcdCourses={setShowAcdCourses} showAcdCourses={showAcdCourses} setShowToast={setShowToast} setTypeToast={setTypeToast} setMessage={setMessage} showToast={showToast} datos={datos} setDatos={setDatos} />
        }
        <div>
          <AddCourse setDatos={setDatos} datos={datos} setShowToast={setShowToast} setMessage={setMessage} setTypeToast={setTypeToast} />

          <ListCourses setDatos={setDatos} datos={datos} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setShowToast={setShowToast} setMessage={setMessage} setShowAcdCourses={setShowAcdCourses} showAcdCourses={showAcdCourses} setTypeToast={setTypeToast} />
        </div>
        <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </div>
    </div>
  )
}

export default App
