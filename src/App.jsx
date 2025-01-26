import AddCourse from "./components/AddCourse"
import ListCourses from "./components/ListCourses"

function App() {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* <div className="space-y-8"></div> */}
      <section className="p-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
        <AddCourse />
      </section>

      <section className="p-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
        <ListCourses />
      </section>
    </div>


  )
}

export default App
