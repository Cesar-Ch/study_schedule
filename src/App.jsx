import { useEffect, useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"
import Toast from "./components/Toast"
import { IconGithub, IconLogo } from "./components/Icons"
import AcademicCourses from "./components/AcademicCourses"


function App() {

  const [userCourses, setUserCourses] = useState(() => {
    const storedDatos = localStorage.getItem('userCourses')
    return storedDatos ? JSON.parse(storedDatos) : {}
  })
  const [selectedCourse, setSelectedCourse] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')
  const [typeToast, setTypeToast] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('userCourses', JSON.stringify(userCourses))
  }, [userCourses])

  return (
    <div className="dark:bg-dark-pri bg-light-pri h-screen min-h-min">
      <header className="border-b dark:bg-dark-sec dark:border-gray-800 bg-white">
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
          isModalOpen && <AcademicCourses setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setShowToast={setShowToast} setTypeToast={setTypeToast} setMessage={setMessage} showToast={showToast} userCourses={userCourses} setUserCourses={setUserCourses} />
        }
        <div>
          {/* <AddCourse setUserCourses={setUserCourses} userCourses={userCourses} setShowToast={setShowToast} setMessage={setMessage} setTypeToast={setTypeToast} /> */}

          <ListCourses setUserCourses={setUserCourses} userCourses={userCourses} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setShowToast={setShowToast} setMessage={setMessage} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setTypeToast={setTypeToast} />
        </div>
        {/* <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} /> */}
      </div>
    </div>
  )
}

export default App
