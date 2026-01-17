import { Header } from "@/components/Header"
import { ListCourses } from "@/components/ListCourses"
import { Schedule } from "./components/Schedule"

function App() {

  return (
    <div className="bg-bg-app h-screen min-h-min ">
      <Header />
      <main className="grid sm:grid-cols-2 p-4 ">
        <div>
          <ListCourses />
        </div>
        <Schedule />

      </main>
    </div>
  )
}

export default App
