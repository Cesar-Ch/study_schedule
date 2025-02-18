import { useEffect, useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"

function App() {

  
  const [datos, setDatos] = useState(() => {
    const storedDatos = localStorage.getItem('datos')
    return storedDatos ? JSON.parse(storedDatos) : {}
  })
  const [selectedCourse, setSelectedCourse] = useState({})

  useEffect(() => {
    localStorage.setItem('datos', JSON.stringify(datos))
    console.log('create')

  }, [datos])

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* <div className="space-y-8"></div> */}
      <div>
        <section className="p-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg border-black dark:border-white dark:bg-[#172754]/10">
          <AddCourse setDatos={setDatos} datos={datos} />
        </section>

        <section className="p-6 mt-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg  border-black dark:border-white dark:bg-[#172754]/10 ">
          <ListCourses setDatos={setDatos} datos={datos} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
        </section>
      </div>


      <section className="p-6 rounded-lg border bg-[#eff3ff]/10 backdrop-blur-lg  border-black dark:border-white dark:bg-[#172754]/10">
        <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </section>
    </div>


  )
}

export default App
