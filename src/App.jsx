import { Header } from "@/components/Header"
import { ListCourses } from "@/components/ListCourses"
import { Schedule } from "./components/Schedule"
import { Toast } from "./components/Toast"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="bg-bg-app h-screen min-h-min" >
      <Toast />
      <Header />
      <main className="grid md:grid-cols-2 p-4 gap-6 mt-20 xl:grid-cols-[600px_1fr]">
        <div>
          <ListCourses />
        </div>
        <Schedule />

      </main>
      <Footer />
    </div>
  )
}

export default App
