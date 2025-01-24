import AddCourse from "./components/AddCourse"

function App() {

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* <div className="space-y-8"></div> */}
      <section className="p-6 rounded-lg shadow-md dark:shadow-white/40 dark:shadow-sm">
        <AddCourse />
      </section>
    </div>


  )
}

export default App
