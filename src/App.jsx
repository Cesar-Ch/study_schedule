import { Header } from "@/components/Header"
import { ListCourses } from "@/components/ListCourses"
import { Schedule } from "./components/Schedule"
import { Toast } from "./components/Toast"

function App() {

  return (
    <div className="bg-bg-app h-screen min-h-min" >
      <Toast />
      <Header />
      <main className="grid sm:grid-cols-2 p-4 gap-6 mt-20">
        <div>
          <ListCourses />
        </div>
        <Schedule />

      </main>
    </div>
  )
}

export default App
