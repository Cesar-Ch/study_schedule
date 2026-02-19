import { days, hours, getCourseColor } from "../utils/colors"
import { Button } from './Button'
import { Check, Download } from "./Icons"
import { useCourses } from "../context/CoursesContext"
import { useState, useRef } from "react"
import { getCourseForCell } from "../utils/scheduleHelpers"
import { useDownloadSchedule } from "../hooks/useDownloadSchedule"

export const Schedule = () => {
  const { selectedSchedule } = useCourses()
  const scheduleRef = useRef(null)
  const { downloadState, download } = useDownloadSchedule(scheduleRef)
  

  return (
    <div className="card text-black dark:text-white overflow-hidden">
      <div className="flex items-center justify-between py-4 px-6 gap-4">
        <h2 className="text-lg font-semibold">Ciclo Académico 2026-I</h2>
        <Button className="bg-brand hover:bg-brand-hover "
          onClick={download}
          disabled={downloadState === 'loading'}>
          {downloadState === 'loading' ? (
            <>
              <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-white">Descargando...</p>
            </>
          ) : downloadState === 'success' ? (
            <>
              <Check className="size-4 text-white" />
              <p className="text-white">¡Descargado!</p>
            </>
          ) : (
            <>
              <Download className="size-4 text-white" />
              <p className="text-white">Descargar</p>
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto" >
        <div
          ref={scheduleRef}
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

              {days.map((day) => {
                const courses = getCourseForCell(day, hour, selectedSchedule)

                return (
                  <div
                    key={`${day}-${hour}`}
                    className="p-1 border-r border-t border-[#333] bg-bg-app "
                  >
                    {courses.map((course, index) => (
                      <div
                        key={`${course.nombre}-${index}`}
                        className={`p-2 rounded border-l-4 ${getCourseColor(course.nombre, selectedSchedule)['schedule']} mb-1 last:mb-0`}
                      >
                        <p className="font-semibold text-xs truncate ">
                          {course.nombre}
                        </p>
                        <p className="text-[10px] opacity-80 truncate text-zinc-500 dark:text-zinc-400">
                          Sec. {course.section}
                        </p>

                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}