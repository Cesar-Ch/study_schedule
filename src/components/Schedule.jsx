import { days, hours } from "../constans"
import { Button } from './Button'
import { Download } from "./Icons"


export const Schedule = () => {


  return (
    <div className="card text-black dark:text-white overflow-hidden">
      <div className="flex items-center justify-between py-4 px-6 gap-4">
        <h2 className="text-lg font-semibold">Ciclo Académico 2026-I</h2>
        <Button className="flex justify-between items-center gap-2">
          <Download className="size-5" /> Descargar
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid text-sm "
          style={{ gridTemplateColumns: "100px repeat(7, 1fr)" }}
        >

          <div className=" p-2 font-semibold  bg-bg-card  border-[#333] border-r border-t text-center"></div>
          {days.map((day) => (
            <div
              key={day}
              className="p-2 text-center  bg-bg-card  border-[#333] border-t border-r text-zinc-500 dark:text-zinc-400"
            >
              {day}
            </div>
          ))}

          {hours.map((hour) => (
            <div key={hour} className="contents">
              <div
                className="text-center p-2 bg-bg-card  border-r border-t border-[#333] text-zinc-500 dark:text-zinc-400"
              >
                {hour}
              </div>

              {days.map((day) => (
                <div
                  key={`${day}-${hour}`}
                  className=" p-2 border-r border-t border-[#333] bg-bg-app"
                >
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


      <div>
      </div>
    </div>
  )
}

