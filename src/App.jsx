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

  return (
    <section className=" p-5 gap-5 flex justify-center flex-col md:flex-row ">
      <div className="md:w-[50%] flex md:flex-col  justify-center items-center flex-wrap gap-5">
        {
          Object.keys(schedule).map((course, index) => (
            <CourseSchedule key={index} courseName={course} item={schedule[course]} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses}/>
          ))
        }
      </div>
      <Schedule selectedCourses={selectedCourses} />
    </section>
  )
}

export default App
