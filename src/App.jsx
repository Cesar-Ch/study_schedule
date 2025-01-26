import { useState } from "react"
import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"
import Schedule from "./components/Schedule"

function App() {

  const [datos, setDatos] = useState({})
  const [selectedCourse, setSelectedCourse] = useState({})
  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* <div className="space-y-8"></div> */}
      <div>
        <section className="p-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
          <AddCourse setDatos={setDatos} datos={datos} />
        </section>

        <section className="p-6 mt-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
          <ListCourses setDatos={setDatos} datos={datos} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
        </section>
      </div>


      <section className="p-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
        <Schedule selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      </section>
    </div>


  )
}

export default App
