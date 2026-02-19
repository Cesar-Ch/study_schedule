import { Accordion, Trash } from "./Icons"
import { useCourses } from "@/context/CoursesContext"
import { getCourseColor } from "@/utils/colors"
import { buildScheduleId } from "@/utils/scheduleHelpers"

export const CourseItem = ({ course, isExpanded, onToggle, onRemove, onAddSchedule }) => {
    const { selectedCourses, selectedSchedule } = useCourses()
    const selectedSection = selectedSchedule.find(s => s.id === buildScheduleId(course))

    return (
        <div className="flex flex-col justify-between items-center dark:bg-bg-card rounded-lg border-[#444] border">
            <div className="w-full flex justify-between items-center p-3 transition" onClick={onToggle}>
                <div className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.25 h-7 rounded-full ${getCourseColor(course.nombre, selectedCourses)['indicator']}`} />
                        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <Accordion className="size-2.5 text-black dark:text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xs text-black dark:text-white">
                                {course.nombre}
                                {selectedSection && (
                                    <span className={`ml-2 text-[10px] font-bold rounded-lg p-1.5 ${getCourseColor(course.nombre, selectedCourses)['section']}`}>
                                        ( {selectedSection.schedule.section} )
                                    </span>
                                )}
                            </h3>
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove() }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-400/20 rounded transition text-zinc-500 dark:text-zinc-400"
                    title="Eliminar curso"
                >
                    <Trash />
                </button>
            </div>

            {isExpanded && course.sections && (
                <div className="w-full border-t border-[#444] bg-bg-app rounded-lg">
                    {course.sections.map((section, index) => (
                        <div
                            key={index}
                            className="p-4 border-b last:border-b-0 border-[#444] transition-all flex justify-start items-center gap-4"
                        >
                            <input
                                type="checkbox"
                                className={`size-3 rounded appearance-none border-2 ${getCourseColor(course.nombre, selectedCourses)['list']}`}
                                name={course.nombre}
                                id={`${course.nombre}-section-${index}`}
                                checked={selectedSchedule.some(
                                    sch => sch.id === buildScheduleId(course) && sch.schedule.section === section.section
                                )}
                                onChange={() => onAddSchedule(course, section)}
                            />
                            <label htmlFor={`${course.nombre}-section-${index}`} className="flex flex-col gap-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-xs text-black dark:text-white mb-1">
                                            Sección {section.section || index + 1}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                            {section.teacher || 'Docente no asignado'}
                                        </p>
                                    </div>
                                </div>
                                {section.horario && section.horario.length > 0 && (
                                    <div className="space-y-1">
                                        {section.horario.map((horario) => (
                                            <div
                                                key={horario.id}
                                                className="text-[10px] flex gap-2 justify-start items-center text-zinc-500 dark:text-zinc-400"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-zinc-500" />
                                                <span className="flex items-center gap-1">{horario.day.slice(0, 3)}:</span>
                                                <span>{horario.start} - {horario.end}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
