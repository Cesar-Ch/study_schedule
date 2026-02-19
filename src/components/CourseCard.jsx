import { Check, Plus } from "./Icons"

export const CourseCard = ({ name, sectionsCount, isAdded, onAdd }) => (
    <div className="border border-[#444] rounded-lg p-4 flex justify-between items-center">
        <div>
            <h4 className="font-semibold text-black dark:text-white mb-2">{name}</h4>
            <span className="inline-block px-2 py-1 bg-bg-field text-black dark:text-white text-xs rounded-2xl">
                {sectionsCount} {sectionsCount === 1 ? 'sección' : 'secciones'}
            </span>
        </div>
        <button
            onClick={onAdd}
            disabled={isAdded}
            className={`p-3 border border-[#444] rounded-full transition ${isAdded ? 'bg-brand border-brand-hover' : 'text-black dark:text-white hover:bg-bg-field'
                }`}
        >
            {isAdded ? <Check /> : <Plus />}
        </button>
    </div>
)