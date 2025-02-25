import { IconToastError } from "./Icons"

const ToastError = () => {
    return (
        <div className="z-10 top-10 right-10 fixed flex items-center justify-start w-[240px]  p-4 rounded-lg bg-transparent backdrop-blur-sm dark:bg-[#0e0e11] dark:bg-opacity-50 border border-gray-700 dark:border-gray-200 animation__toast">
            <IconToastError />
            <p className="mx-2 text-sm font-medium">Horario en conflicto</p>

        </div>
    )
}

export default ToastError