import { useState } from "react";

const ListCourses = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Lista de cursos</h2>
            <div>
                {/* Sección 1 */}
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border  border-gray-200   dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#27272a] gap-3 ${openSection === 1 ? "bg-gray-100 dark:bg-[#27272a]" : ""
                            }`}
                        onClick={() => toggleSection(1)}
                    >
                        <span>BD</span>
                        <svg
                            data-accordion-icon
                            className={`w-3 h-3 transform ${openSection === 1 ? "rotate-180" : ""
                                } shrink-0`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-collapse-body-1"
                    className={`${openSection === 1 ? "block" : "hidden"} p-5 dark:bg-[#0e0e11] border  border-gray-200 dark:border-gray-700`}
                >
                    <label htmlFor="checkbox-table-search-1" className="flex items-center gap-2">
                        <input
                            id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                        <span className="text-gray-900 dark:text-white">Profesor</span>
                        <span className="text-gray-500 dark:text-gray-400">(A) 10:00 - 11:00</span>
                        
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ListCourses;
